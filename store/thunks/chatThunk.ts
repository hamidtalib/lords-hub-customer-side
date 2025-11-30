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

let _unsubscribe: (() => void) | null = null;

export function subscribeToMessages(
  onUpdate: (messages: ChatMessage[]) => void
) {
  const visitorId = getOrCreateVisitorId();
  if (_unsubscribe) return _unsubscribe;
  const messagesRef = collection(
    firestore,
    "chatSessions",
    visitorId,
    "messages"
  );
  const q = query(messagesRef, orderBy("timestamp", "asc"));
  _unsubscribe = onSnapshot(
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
      onUpdate([]);
      console.error(err);
    }
  );
  return _unsubscribe;
}

export function cleanupSubscription() {
  if (_unsubscribe) {
    _unsubscribe();
    _unsubscribe = null;
  }
}
