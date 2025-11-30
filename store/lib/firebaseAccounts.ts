import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  Unsubscribe
} from "firebase/firestore";
import { firestore } from "./firebase";

export interface Account {
  id: string;
  images: string[];
  price: number;
  productId: string;
  title: string;
  type: "restricted" | "open";
  updatedAt: any;
  createdAt: any;
  description: string;
}

const ACCOUNTS_PER_PAGE = 10;

export async function getAccountsByType(
  type: "restricted" | "open",
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ accounts: Account[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; hasMore: boolean }> {
  try {
    const accountsRef = collection(firestore, "accounts");
    
    let q = query(
      accountsRef,
      where("type", "==", type),
      orderBy("createdAt", "desc"),
      limit(ACCOUNTS_PER_PAGE)
    );

    if (lastDoc) {
      q = query(
        accountsRef,
        where("type", "==", type),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(ACCOUNTS_PER_PAGE)
      );
    }

    const snapshot = await getDocs(q);
    
    const accounts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Account[];

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
    const hasMore = snapshot.docs.length === ACCOUNTS_PER_PAGE;

    return { accounts, lastDoc: newLastDoc, hasMore };
  } catch (error: any) {
    if (error?.code === "failed-precondition" || error?.message?.includes("index")) {
      console.error(
        `🔥 FIRESTORE INDEX REQUIRED for accounts collection!
        
Please create a composite index with these settings:
Collection: accounts
Fields to index:
  - type (Ascending)
  - createdAt (Descending)
Query scope: Collection

You can create it here:
${error?.message?.match(/https:\/\/[^\s]+/)?.[0] || "Check Firebase Console > Firestore > Indexes"}
        `
      );
    }
    console.error(`Error fetching ${type} accounts:`, error);
    return { accounts: [], lastDoc: null, hasMore: false };
  }
}

export async function getAllAccounts(): Promise<Account[]> {
  try {
    const accountsRef = collection(firestore, "accounts");
    const snapshot = await getDocs(accountsRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Account[];
  } catch (error) {
    console.error("Error fetching all accounts:", error);
    return [];
  }
}

export async function getAccountById(id: string): Promise<Account | null> {
  try {
    const accountRef = doc(firestore, "accounts", id);
    const snapshot = await getDoc(accountRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Account;
  } catch (error) {
    console.error(`Error fetching account ${id}:`, error);
    return null;
  }
}

// Realtime listener for accounts by type
export function subscribeToAccountsByType(
  type: "restricted" | "open",
  callback: (accounts: Account[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const accountsRef = collection(firestore, "accounts");
  const q = query(
    accountsRef,
    where("type", "==", type),
    orderBy("createdAt", "desc"),
    limit(ACCOUNTS_PER_PAGE)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const accounts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Account[];
      callback(accounts);
    },
    (error) => {
      console.error(`Error in accounts realtime listener:`, error);
      if (onError) onError(error);
    }
  );
}
