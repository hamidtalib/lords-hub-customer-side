import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  Unsubscribe
} from "firebase/firestore";
import { firestore } from "./firebase";

export interface Bot {
  id: string;
  name: string;
  description: string;
  price: number;
  productId: string;
  type: "rein" | "war" | "kvk" | "farm";
  features: string[];
  createdAt: any;
  updatedAt: any;
}

export type BotType = "rein" | "war" | "kvk" | "farm";

const BOTS_PER_PAGE = 10;

export async function getBotsByType(
  type: BotType,
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ bots: Bot[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; hasMore: boolean }> {
  try {
    const botsRef = collection(firestore, "bots");
    
    // Build query with type filter, ordering, and pagination
    let q = query(
      botsRef,
      where("type", "==", type),
      orderBy("createdAt", "desc"),
      limit(BOTS_PER_PAGE)
    );

    // If we have a last document, start after it for pagination
    if (lastDoc) {
      q = query(
        botsRef,
        where("type", "==", type),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(BOTS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(q);
    
    const bots = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Bot[];

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
    const hasMore = snapshot.docs.length === BOTS_PER_PAGE;

    return { bots, lastDoc: newLastDoc, hasMore };
  } catch (error: any) {
    // Check if it's an index error
    if (error?.code === "failed-precondition" || error?.message?.includes("index")) {
      console.error(
        `🔥 FIRESTORE INDEX REQUIRED for bots collection!
        
Please create a composite index with these settings:
Collection: bots
Fields to index:
  - type (Ascending)
  - createdAt (Descending)
Query scope: Collection

You can create it here:
${error?.message?.match(/https:\/\/[^\s]+/)?.[0] || "Check Firebase Console > Firestore > Indexes"}
        `
      );
    }
    console.error(`Error fetching ${type} bots:`, error);
    return { bots: [], lastDoc: null, hasMore: false };
  }
}

export async function getAllBots(): Promise<Bot[]> {
  try {
    const botsRef = collection(firestore, "bots");
    const snapshot = await getDocs(botsRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Bot[];
  } catch (error) {
    console.error("Error fetching all bots:", error);
    return [];
  }
}

// Realtime listener for bots by type
export function subscribeToBotsByType(
  type: BotType,
  callback: (bots: Bot[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const botsRef = collection(firestore, "bots");
  const q = query(
    botsRef,
    where("type", "==", type),
    orderBy("createdAt", "desc"),
    limit(BOTS_PER_PAGE)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const bots = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Bot[];
      callback(bots);
    },
    (error) => {
      console.error(`Error in bots realtime listener:`, error);
      if (onError) onError(error);
    }
  );
}
