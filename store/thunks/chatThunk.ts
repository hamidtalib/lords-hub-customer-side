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
import { loadSocialMediaLinks } from "@/store/thunks/socialMediaThunk";

export interface ChatSession {
  visitorId: string;
  visitorName: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: string;
  unreadCount: number;
}

export interface ChatButton {
  label: string;
  url: string;
  type?: "primary" | "secondary";
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
  buttons?: ChatButton[];
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
          buttons: data.buttons,
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
          buttons: data.buttons,
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
    diamonds?: boolean;
    accounts?: boolean;
    wishlist?: string;
    total?: string;
    inquiry?: string;
    formUrl?: string;
    source?: "farm-bots" | "war-bots" | "kvk-bots" | "rein-bots" | "gems" | "diamonds" | "accounts" | "navbar" | "floating-button" | "home" | "faq" | "about" | "offers";
  }, { rejectWithValue, dispatch, getState }) => {
    try {
      const visitorId = getOrCreateVisitorId();
      
      // Prevent rapid duplicate calls
      const callKey = `${visitorId}_${context.source || 'navbar'}_${Date.now()}`;
      const lastCallKey = (global as any).lastWelcomeCall;
      const now = Date.now();
      
      if (lastCallKey && now - parseInt(lastCallKey.split('_')[2]) < 1000) {
        console.log("Preventing duplicate welcome call within 1 second");
        return null;
      }
      
      (global as any).lastWelcomeCall = callKey;
      
      console.log("=== sendAdminWelcomeMessage called ===");
      console.log("Timestamp:", new Date().toISOString());
      console.log("Context:", JSON.stringify(context, null, 2));
      console.log("Visitor ID:", visitorId);
      
      // Load social media links first
      await dispatch(loadSocialMediaLinks());
      const state = getState() as any;
      const socialLinks = state.socialMedia.links;
      
      // Check if there are already messages
      const messagesRef = collection(
        firestore,
        "chatSessions",
        visitorId,
        "messages"
      );
      const messagesSnapshot = await getDocs(messagesRef);
      
      console.log("Existing messages count:", messagesSnapshot.size);
      
      // Check if there's already an admin welcome message and what type
      let hasAdminWelcomeMessage = false;
      let hasContextualMessage = false;
      let existingContexts: string[] = [];
      
      messagesSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.sender === "admin" && data.text) {
          if (data.text.includes("Welcome to Lords Hub")) {
            hasAdminWelcomeMessage = true;
          }
          // Check for specific contextual messages
          if (data.text.includes("Farm Bot services")) {
            existingContexts.push("farm-bots");
            hasContextualMessage = true;
          }
          if (data.text.includes("interested in purchasing gems")) {
            existingContexts.push("gems");
            hasContextualMessage = true;
          }
          if (data.text.includes("interested in purchasing diamonds")) {
            existingContexts.push("diamonds");
            hasContextualMessage = true;
          }
          if (data.text.includes("Lords Mobile accounts")) {
            existingContexts.push("accounts");
            hasContextualMessage = true;
          }
          if (data.text.includes("War Bot services")) {
            existingContexts.push("war-bots");
            hasContextualMessage = true;
          }
          if (data.text.includes("KVK Bot services")) {
            existingContexts.push("kvk-bots");
            hasContextualMessage = true;
          }
          if (data.text.includes("REIN Bot services")) {
            existingContexts.push("rein-bots");
            hasContextualMessage = true;
          }
        }
      });
      
      console.log("Has admin welcome message:", hasAdminWelcomeMessage);
      console.log("Has contextual message:", hasContextualMessage);
      console.log("Existing contexts:", existingContexts);
      
      // Determine if we should send a welcome message
      let shouldSendWelcome = false;
      
      if (messagesSnapshot.empty) {
        // Always send welcome if no messages exist
        shouldSendWelcome = true;
        console.log("No messages exist, will send welcome");
      } else if (!hasAdminWelcomeMessage && !hasContextualMessage) {
        // Send welcome if no admin messages exist yet
        shouldSendWelcome = true;
        console.log("No admin messages exist, will send welcome");
      } else if (context.source && context.source !== "navbar" && !existingContexts.includes(context.source)) {
        // Only send contextual welcome if it's a new context we haven't seen before
        shouldSendWelcome = true;
        console.log(`New context '${context.source}' provided, will send contextual welcome message`);
      }
      
      if (shouldSendWelcome) {
        let welcomeText = "Hello! Welcome to Lords Hub. How can I assist you today?";
        let buttons: ChatButton[] = [];
        
        console.log("Preparing welcome message...");
        
        // Always add social buttons - the SocialButtons component will handle validation
        const socialButtons: ChatButton[] = [
          { label: "WhatsApp", url: "#", type: "primary" },
          { label: "Telegram", url: "#", type: "secondary" }
        ];
        
        // Customize message based on context
        // Check inquiry first (more specific)
        if (context.inquiry === "bot-subscription" || context.source === "farm-bots") {
          const formLink = context.formUrl 
            ? decodeURIComponent(context.formUrl)
            : "https://docs.google.com/forms/d/e/1FAIpQLSfgSHUoSSFxxQ9HJKtUGhcocqAtf0a7VJy8gXgYHm20BFCjeQ/viewform?usp=dialog";
          
          console.log("Farm Bot subscription detected! Form link:", formLink);
          
          welcomeText = `Hello! I see you're interested in our Farm Bot services. Please fill out the form first to help us understand your requirements better, then we can proceed with your subscription.\n\n📋 Form Link: ${formLink}\n\nOnce completed, feel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.source === "war-bots" || context.source === "kvk-bots" || context.source === "rein-bots") {
          const botType = context.source === "war-bots" ? "War" : context.source === "kvk-bots" ? "KVK" : "REIN";
          welcomeText = `Hello! I see you're interested in our ${botType} Bot services. I'd be happy to help you with your subscription!\n\nPlease share your requirements:\n• Number of accounts\n• Kingdom details\n• Specific features needed\n• Any special requirements\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.inquiry === "sell-account" || context.accounts || context.source === "accounts") {
          welcomeText = `Hello! I understand you're interested in our Lords Mobile accounts. I'd be happy to help you!\n\nPlease share what you're looking for:\n• Account might and power level\n• Troop levels (T4, T5, etc.)\n• Heroes and gear collection\n• Research progress\n• Kingdom type preference\n• Budget range\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.gems || context.source === "gems") {
          if (context.wishlist) {
            try {
              const wishlist = JSON.parse(decodeURIComponent(context.wishlist));
              const itemsList = wishlist.map((item: any) => 
                `• ${item.name} (${item.tab}): ${item.quantity}x = ${item.gemCost * item.quantity} gems`
              ).join('\n');
              
              welcomeText = `Hello! I see you're interested in purchasing gems. Here's your wishlist:\n\n${itemsList}\n\nTotal: ${context.total} gems\n\nHow would you like to proceed with this order?\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
            } catch (e) {
              welcomeText = `Hello! I see you're interested in purchasing gems (Total: ${context.total} gems). How can I help you complete this order?\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
            }
          } else {
            welcomeText = `Hello! I see you're interested in purchasing gems. I'd be happy to help you with your order!\n\nPlease let me know:\n• What items you need\n• Quantity required\n• Any specific preferences\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          }
          buttons = socialButtons;
        } else if (context.diamonds || context.source === "diamonds") {
          welcomeText = `Hello! I see you're interested in purchasing diamonds. I'd be happy to help you with your order!\n\nPlease let me know:\n• Amount of diamonds needed\n• Any specific requirements\n• Preferred payment method\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.source === "offers" && context.productId) {
          welcomeText = `Hello! I see you're interested in one of our special offers! I'd be happy to help you with this exclusive deal.\n\nPlease let me know if you have any questions about:\n• Product details\n• Pricing and payment\n• Delivery timeline\n• Any special requirements\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.source === "home") {
          welcomeText = `Hello! Welcome to Lords Hub - your trusted source for Lords Mobile services!\n\nWe offer:\n• Premium Accounts\n• Gems & Diamonds\n• Bot Services (Farm, War, KVK, REIN)\n• And much more!\n\nHow can I help you today?\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.source === "faq") {
          welcomeText = `Hello! I see you have a question. I'm here to help!\n\nPlease feel free to ask about:\n• Our products and services\n• Payment methods\n• Delivery process\n• Account security\n• Any other concerns\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.source === "about") {
          welcomeText = `Hello! Thank you for your interest in Lords Hub!\n\nWe're dedicated to providing the best Lords Mobile services with:\n• Trusted and secure transactions\n• 24/7 customer support\n• Competitive pricing\n• Fast delivery\n\nHow can I assist you today?\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.productId) {
          welcomeText = `Hello! I see you're interested in one of our products. I'd be happy to help you with this purchase. Do you have any questions?\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        } else if (context.source === "navbar" || context.source === "floating-button" || !context.source) {
          // Direct chat access from navbar or floating button
          welcomeText = `Hello! Welcome to Lords Hub. How can I assist you today?\n\nFeel free to message us anytime on WhatsApp or Telegram.`;
          buttons = socialButtons;
        }
        
        console.log("Welcome message prepared:", welcomeText.substring(0, 100) + "...");
        
        // Send the admin message
        const data = {
          sender: "admin" as const,
          text: welcomeText,
          timestamp: serverTimestamp(),
          read: false,
          buttons: buttons.length > 0 ? buttons : undefined,
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
          buttons,
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
