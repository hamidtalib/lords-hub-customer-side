import {
  collection,
  getDocs,
  query,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { firestore } from "./firebase";

export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  order?: number;
  isActive?: boolean;
}

/**
 * Fetch all social media links from Firestore
 */
export async function fetchSocialMediaLinks(): Promise<SocialMediaLink[]> {
  try {
    const linksRef = collection(firestore, "socialMediaLinks");
    const q = query(linksRef);

    const snapshot = await getDocs(q);
    console.log("snapshot: ", snapshot.docs);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      platform: doc.data().platform || "",
      url: doc.data().url || "",
    }));
  } catch (error) {
    console.error("Error fetching social media links:", error);
    return [];
  }
}

/**
 * Realtime listener for social media links
 */
export function subscribeToSocialMediaLinks(
  callback: (links: SocialMediaLink[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const linksRef = collection(firestore, "socialMediaLinks");
  const q = query(linksRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const links = snapshot.docs.map((doc) => ({
        id: doc.id,
        platform: doc.data().platform || "",
        url: doc.data().url || "",
      }));
      callback(links);
    },
    (error) => {
      console.error("Error in social media links listener:", error);
      if (onError) onError(error);
    }
  );
}
