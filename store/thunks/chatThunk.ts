import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../src/config/firebase";
import { getOrCreateVisitorId } from "@/store/lib/utils/visitorId";

export interface ChatSession {
  visitorId: string;
  visitorName: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  sender: "visitor" | "admin";
  text?: string;
  timestamp: Date;
  read: boolean;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  clientRequestId?: string;
  status?: "sending" | "sent" | "failed";
}

export const createOrGetChatSession = createAsyncThunk(
  "chat/createOrGetChatSession",
  async (_, { rejectWithValue }) => {
    try {
      const visitorId = getOrCreateVisitorId();
      const sessionRef = doc(firestore, "chatSessions", visitorId);
      const snap = await getDoc(sessionRef);
      if (snap.exists()) {
        const data = snap.data();
        return {
          visitorId: data.visitorId,
          visitorName: data.visitorName,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : new Date(),
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate()
            : new Date(),
          lastMessage: data.lastMessage,
          unreadCount: data.unreadCount || 0,
        } as ChatSession;
      }
      const now = new Date();
      const newSession: ChatSession = {
        visitorId,
        visitorName: `Visitor ${visitorId.slice(-8)}`,
        createdAt: now,
        updatedAt: now,
        unreadCount: 0,
      };
      await setDoc(sessionRef, {
        visitorId,
        visitorName: newSession.visitorName,
        createdAt: Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
        unreadCount: 0,
      });
      return newSession;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadMessages = createAsyncThunk(
  "chat/loadMessages",
  async (_, { rejectWithValue }) => {
    try {
      const visitorId = getOrCreateVisitorId();
      const messagesRef = collection(
        firestore,
        "chatSessions",
        visitorId,
        "messages"
      );
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const snap = await getDocs(q);
      const messages: ChatMessage[] = [];
      snap.forEach((d) => {
        const data = d.data();
        messages.push({
          id: d.id,
          sender: data.sender,
          text: data.text,
          timestamp: data.timestamp?.toDate
            ? data.timestamp.toDate()
            : new Date(),
          read: data.read || false,
          mediaUrl: data.mediaUrl,
          mediaType: data.mediaType,
        });
      });
      return messages;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (text: string, { rejectWithValue }) => {
    try {
      const visitorId = getOrCreateVisitorId();
      const messagesRef = collection(
        firestore,
        "chatSessions",
        visitorId,
        "messages"
      );
      const data = {
        sender: "visitor" as const,
        text,
        timestamp: serverTimestamp(),
        read: false,
      };
      const docRef = await addDoc(messagesRef, data);
      const sessionRef = doc(firestore, "chatSessions", visitorId);
      await setDoc(
        sessionRef,
        {
          lastMessage: text,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      return {
        id: docRef.id,
        sender: "visitor",
        text,
        timestamp: new Date(),
        read: false,
      } as ChatMessage;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const sendMediaMessage = createAsyncThunk(
  "chat/sendMediaMessage",
  async (
    { text, file }: { text?: string; file: File },
    { rejectWithValue }
  ) => {
    try {
      const visitorId = getOrCreateVisitorId();
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `chat/${visitorId}/${fileName}`);
      await uploadBytes(storageRef, file);
      const mediaUrl = await getDownloadURL(storageRef);
      const mediaType = file.type.startsWith("image/") ? "image" : "video";
      const messagesRef = collection(
        firestore,
        "chatSessions",
        visitorId,
        "messages"
      );
      const data = {
        sender: "visitor" as const,
        text: text || "",
        mediaUrl,
        mediaType,
        timestamp: serverTimestamp(),
        read: false,
      };
      const docRef = await addDoc(messagesRef, data);
      const sessionRef = doc(firestore, "chatSessions", visitorId);
      await setDoc(
        sessionRef,
        {
          lastMessage: text || `[${mediaType}]`,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      return {
        id: docRef.id,
        sender: "visitor",
        text: text || "",
        mediaUrl,
        mediaType,
        timestamp: new Date(),
        read: false,
      } as ChatMessage;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Store subscriptions per visitorId to handle multiple sessions
const _subscriptions = new Map<string, () => void>();

export function subscribeToMessages(
  visitorId: string,
  onUpdate: (messages: ChatMessage[]) => void
) {
  // Clean up existing subscription for this visitor
  const existingUnsubscribe = _subscriptions.get(visitorId);
  if (existingUnsubscribe) {
    existingUnsubscribe();
    _subscriptions.delete(visitorId);
  }

  const messagesRef = collection(
    firestore,
    "chatSessions",
    visitorId,
    "messages"
  );
  const q = query(messagesRef, orderBy("timestamp", "asc"));
  
  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const messages: ChatMessage[] = [];
      snap.forEach((d) => {
        const data = d.data();
        messages.push({
          id: d.id,
          sender: data.sender,
          text: data.text,
          timestamp: data.timestamp?.toDate
            ? data.timestamp.toDate()
            : new Date(),
          read: data.read || false,
          mediaUrl: data.mediaUrl,
          mediaType: data.mediaType,
        });
      });
      onUpdate(messages);
    },
    (err) => {
      console.error("Error subscribing to messages:", err);
      onUpdate([]);
    }
  );

  _subscriptions.set(visitorId, unsubscribe);
  return unsubscribe;
}

export function cleanupSubscription(visitorId?: string) {
  if (visitorId) {
    const unsubscribe = _subscriptions.get(visitorId);
    if (unsubscribe) {
      unsubscribe();
      _subscriptions.delete(visitorId);
    }
  } else {
    // Clean up all subscriptions
    _subscriptions.forEach((unsubscribe) => unsubscribe());
    _subscriptions.clear();
  }
}

// Send admin welcome message based on context
export const sendAdminWelcomeMessage = createAsyncThunk(
  "chat/sendAdminWelcomeMessage",
  async (context: {
    productId?: string;
    gems?: boolean;
    wishlist?: string;
    total?: string;
    inquiry?: string;
    formUrl?: string;
  }, { rejectWithValue }) => {
    try {
      const visitorId = getOrCreateVisitorId();
      
      console.log("=== sendAdminWelcomeMessage called ===");
      console.log("Context:", JSON.stringify(context, null, 2));
      console.log("Visitor ID:", visitorId);
      
      // Check if there are already messages
      const messagesRef = collection(
        firestore,
        "chatSessions",
        visitorId,
        "messages"
      );
      const messagesSnapshot = await getDocs(messagesRef);
      
      console.log("Existing messages count:", messagesSnapshot.size);
      
      // Determine if we should send a welcome message
      let shouldSendWelcome = false;
      
      if (messagesSnapshot.empty) {
        // Always send welcome if no messages exist
        shouldSendWelcome = true;
        console.log("No messages exist, will send welcome");
      } else if (context.gems || context.productId || context.inquiry) {
        // If there's a specific context, always send the welcome message
        shouldSendWelcome = true;
        console.log("Context provided, will send welcome message");
      }
      
      if (shouldSendWelcome) {
        let welcomeText = "Hello! Welcome to Lords Hub. How can I assist you today?";
        
        console.log("Preparing welcome message...");
        
        // Customize message based on context
        // Check inquiry first (more specific)
        if (context.inquiry === "bot-subscription") {
          const formLink = context.formUrl 
            ? decodeURIComponent(context.formUrl)
            : "https://docs.google.com/forms/d/e/1FAIpQLSfgSHUoSSFxxQ9HJKtUGhcocqAtf0a7VJy8gXgYHm20BFCjeQ/viewform?usp=dialog";
          
          console.log("Bot subscription detected! Form link:", formLink);
          
          welcomeText = `Hello! I see you're interested in our bot services. Please fill out the form first to help us understand your requirements better, then we can proceed with your subscription.\n\n📋 Form Link: ${formLink}\n\nOnce completed, feel free to message me here with any questions!`;
        } else if (context.inquiry === "sell-account") {
          welcomeText = `Hello! I understand you're interested in selling your Lords Mobile account. I'd be happy to help you with that! Please share some details about your account:\n\n• Account might and power level\n• Troop levels (T4, T5, etc.)\n• Heroes and gear collection\n• Research progress\n• Kingdom type (restricted/open)\n• Screenshots if available\n\nThis will help me provide you with a fair valuation.`;
        } else if (context.gems && context.wishlist) {
          try {
            const wishlist = JSON.parse(decodeURIComponent(context.wishlist));
            const itemsList = wishlist.map((item: any) => 
              `• ${item.name} (${item.tab}): ${item.quantity}x = ${item.gemCost * item.quantity} gems`
            ).join('\n');
            
            welcomeText = `Hello! I see you're interested in purchasing gems. Here's your wishlist:\n\n${itemsList}\n\nTotal: ${context.total} gems\n\nHow would you like to proceed with this order?`;
          } catch (e) {
            welcomeText = `Hello! I see you're interested in purchasing gems (Total: ${context.total} gems). How can I help you complete this order?`;
          }
        } else if (context.productId) {
          welcomeText = `Hello! I see you're interested in one of our products (ID: ${context.productId}). I'd be happy to help you with this purchase. Do you have any questions?`;
        }
        
        console.log("Welcome message prepared:", welcomeText.substring(0, 100) + "...");
        
        // Send the admin message
        const data = {
          sender: "admin" as const,
          text: welcomeText,
          timestamp: serverTimestamp(),
          read: false,
        };
        
        console.log("Adding message to Firestore...");
        const docRef = await addDoc(messagesRef, data);
        console.log("Message added with ID:", docRef.id);
        
        // Update session
        const sessionRef = doc(firestore, "chatSessions", visitorId);
        await setDoc(
          sessionRef,
          {
            lastMessage: welcomeText.substring(0, 50) + "...",
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        
        console.log("Admin welcome message sent successfully");
        
        return {
          id: docRef.id,
          sender: "admin",
          text: welcomeText,
          timestamp: new Date(),
          read: false,
        } as ChatMessage;
      } else {
        console.log("Chat already has messages, skipping welcome message");
      }
      
      return null;
    } catch (err) {
      console.error("Error sending admin welcome message:", err);
      return rejectWithValue(err);
    }
  }
);
