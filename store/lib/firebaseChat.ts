import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "./firebase";
import { getOrCreateVisitorId } from "@/lib/utils/visitorId";

/**
 * FIRESTORE STRUCTURE:
 * 
 * chatSessions/{visitorId}
 *   - visitorId: string
 *   - visitorName: string
 *   - createdAt: timestamp
 *   - updatedAt: timestamp
 *   - lastMessage: string
 *   - unreadCount: number
 * 
 * chatSessions/{visitorId}/messages/{messageId}
 *   - sender: "visitor" | "admin"
 *   - text: string
 *   - timestamp: timestamp
 *   - read: boolean
 */

// Active listeners registry to prevent duplicates
const activeListeners = new Map<string, () => void>();

// Types
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
  text: string;
  timestamp: Date;
  read: boolean;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

/**
 * Create or get existing chat session for visitor
 * Uses visitorId as document ID to ensure single session per visitor
 * 
 * @returns {Promise<ChatSession>} The chat session
 */
export async function createOrGetChatSession(): Promise<ChatSession> {
  const visitorId = getOrCreateVisitorId();
  const sessionRef = doc(firestore, "chatSessions", visitorId);

  // Check if session exists
  const sessionSnap = await getDoc(sessionRef);

  if (sessionSnap.exists()) {
    // Session exists - return it
    const data = sessionSnap.data();
    return {
      visitorId: data.visitorId,
      visitorName: data.visitorName,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      lastMessage: data.lastMessage,
      unreadCount: data.unreadCount || 0,
    };
  }

  // Create new session
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
}

/**
 * Send a message from visitor to admin
 * 
 * @param {string} text - Message text
 * @returns {Promise<ChatMessage>} The sent message
 */
export async function sendMessage(text: string): Promise<ChatMessage> {
  const visitorId = getOrCreateVisitorId();
  
  // Ensure session exists
  await createOrGetChatSession();

  // Add message to subcollection
  const messagesRef = collection(firestore, "chatSessions", visitorId, "messages");
  const messageData = {
    sender: "visitor" as const,
    text,
    timestamp: serverTimestamp(),
    read: false,
  };

  const docRef = await addDoc(messagesRef, messageData);

  // Update session's lastMessage and updatedAt
  const sessionRef = doc(firestore, "chatSessions", visitorId);
  await setDoc(sessionRef, {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  return {
    id: docRef.id,
    sender: "visitor",
    text,
    timestamp: new Date(),
    read: false,
  };
}

/**
 * Send a message with media (image or video) from visitor to admin
 * 
 * @param {string} text - Message text (optional)
 * @param {File} file - Media file to upload
 * @returns {Promise<ChatMessage>} The sent message
 */
export async function sendMediaMessage(text: string, file: File): Promise<ChatMessage> {
  const visitorId = getOrCreateVisitorId();
  
  // Ensure session exists
  await createOrGetChatSession();

  // Upload file to Firebase Storage
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `chat/${visitorId}/${fileName}`);
  
  await uploadBytes(storageRef, file);
  const mediaUrl = await getDownloadURL(storageRef);

  // Determine media type
  const mediaType = file.type.startsWith("image/") ? "image" : "video";

  // Add message to subcollection
  const messagesRef = collection(firestore, "chatSessions", visitorId, "messages");
  const messageData = {
    sender: "visitor" as const,
    text,
    mediaUrl,
    mediaType,
    timestamp: serverTimestamp(),
    read: false,
  };

  const docRef = await addDoc(messagesRef, messageData);

  // Update session's lastMessage and updatedAt
  const sessionRef = doc(firestore, "chatSessions", visitorId);
  const lastMessage = text || `[${mediaType}]`;
  await setDoc(sessionRef, {
    lastMessage,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  return {
    id: docRef.id,
    sender: "visitor",
    text,
    mediaUrl,
    mediaType,
    timestamp: new Date(),
    read: false,
  };
}

/**
 * Load all messages for current visitor
 * Loads from chatSessions/{visitorId}/messages subcollection
 * 
 * @returns {Promise<ChatMessage[]>} Array of messages
 */
export async function loadMessages(): Promise<ChatMessage[]> {
  const visitorId = getOrCreateVisitorId();
  
  const messagesRef = collection(firestore, "chatSessions", visitorId, "messages");
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  const snapshot = await getDocs(messagesQuery);
  const messages: ChatMessage[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    messages.push({
      id: doc.id,
      sender: data.sender,
      text: data.text,
      timestamp: data.timestamp?.toDate() || new Date(),
      read: data.read || false,
    });
  });

  return messages;
}

/**
 * Subscribe to real-time message updates
 * Listens to chatSessions/{visitorId}/messages subcollection
 * 
 * @param {Function} onMessagesUpdate - Callback when messages change
 * @returns {Function} Unsubscribe function
 */
export function subscribeToMessages(
  onMessagesUpdate: (messages: ChatMessage[]) => void
): () => void {
  const visitorId = getOrCreateVisitorId();
  const listenerKey = visitorId;

  // Prevent duplicate listeners
  if (activeListeners.has(listenerKey)) {
    return activeListeners.get(listenerKey)!;
  }

  const messagesRef = collection(firestore, "chatSessions", visitorId, "messages");
  const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

  // Set up real-time listener
  const unsubscribe = onSnapshot(
    messagesQuery,
    (snapshot) => {
      const messages: ChatMessage[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          sender: data.sender,
          text: data.text,
          timestamp: data.timestamp?.toDate() || new Date(),
          read: data.read || false,
          mediaUrl: data.mediaUrl,
          mediaType: data.mediaType,
        });
      });

      onMessagesUpdate(messages);
    },
    (error) => {
      console.error("Message subscription error:", error);
      onMessagesUpdate([]);
    }
  );

  // Store cleanup function
  const cleanup = () => {
    try {
      unsubscribe();
      activeListeners.delete(listenerKey);
    } catch (error) {
      console.error("Error cleaning up listener:", error);
    }
  };

  activeListeners.set(listenerKey, cleanup);
  return cleanup;
}

/**
 * Get current visitor's chat session
 * Returns null if no session exists
 * 
 * @returns {Promise<ChatSession | null>}
 */
export async function getChatSession(): Promise<ChatSession | null> {
  const visitorId = getOrCreateVisitorId();
  const sessionRef = doc(firestore, "chatSessions", visitorId);

  const sessionSnap = await getDoc(sessionRef);

  if (!sessionSnap.exists()) {
    return null;
  }

  const data = sessionSnap.data();
  return {
    visitorId: data.visitorId,
    visitorName: data.visitorName,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    lastMessage: data.lastMessage,
    unreadCount: data.unreadCount || 0,
  };
}

/**
 * Cleanup all active listeners
 * Call this on component unmount
 */
export function cleanupAllListeners(): void {
  activeListeners.forEach((cleanup) => cleanup());
  activeListeners.clear();
}
