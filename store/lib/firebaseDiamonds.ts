import { 
  collection, 
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  Unsubscribe
} from "firebase/firestore";
import { firestore } from "./firebase";

export interface Diamond {
  id: string;
  name: string;
  description: string;
  price: number;
  productId: string;
  createdAt: any;
  updatedAt: any;
}

const DIAMONDS_PER_PAGE = 10;

export async function getAllDiamonds(
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ diamonds: Diamond[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; hasMore: boolean }> {
  try {
    const diamondsRef = collection(firestore, "diamonds");
    
    let q = query(
      diamondsRef,
      orderBy("createdAt", "desc"),
      limit(DIAMONDS_PER_PAGE)
    );

    if (lastDoc) {
      q = query(
        diamondsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(DIAMONDS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(q);
    
    const diamonds = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Diamond[];

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
    const hasMore = snapshot.docs.length === DIAMONDS_PER_PAGE;

    return { diamonds, lastDoc: newLastDoc, hasMore };
  } catch (error: any) {
    if (error?.code === "failed-precondition" || error?.message?.includes("index")) {
      console.error(
        `🔥 FIRESTORE INDEX REQUIRED for diamonds collection!
        
Please create an index with these settings:
Collection: diamonds
Fields to index:
  - createdAt (Descending)
Query scope: Collection

You can create it here:
${error?.message?.match(/https:\/\/[^\s]+/)?.[0] || "Check Firebase Console > Firestore > Indexes"}
        `
      );
    }
    console.error("Error fetching diamonds:", error);
    return { diamonds: [], lastDoc: null, hasMore: false };
  }
}

// Realtime listener for diamonds
export function subscribeToDiamonds(
  callback: (diamonds: Diamond[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const diamondsRef = collection(firestore, "diamonds");
  const q = query(
    diamondsRef,
    orderBy("createdAt", "desc"),
    limit(DIAMONDS_PER_PAGE)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const diamonds = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Diamond[];
      callback(diamonds);
    },
    (error) => {
      console.error(`Error in diamonds realtime listener:`, error);
      if (onError) onError(error);
    }
  );
}
