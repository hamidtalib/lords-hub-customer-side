import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "./firebase";

export interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}

/**
 * Subscribe an email to the newsletter
 * Checks for duplicates before adding
 * 
 * @param {string} email - Email address to subscribe
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Please enter a valid email address" };
    }

    // Check if email already exists
    const subscribersRef = collection(firestore, "newsletter_subscribers");
    const q = query(subscribersRef, where("email", "==", email.toLowerCase()));
    const existingSubscribers = await getDocs(q);

    if (!existingSubscribers.empty) {
      return { success: false, message: "This email is already subscribed" };
    }

    // Add new subscriber
    await addDoc(subscribersRef, {
      email: email.toLowerCase(),
      subscribedAt: Timestamp.now(),
      isActive: true,
    });

    return { success: true, message: "Successfully subscribed to newsletter!" };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, message: "Failed to subscribe. Please try again." };
  }
}

/**
 * Get all active newsletter subscribers (Admin only)
 * 
 * @returns {Promise<NewsletterSubscription[]>}
 */
export async function getAllSubscribers(): Promise<NewsletterSubscription[]> {
  const subscribersRef = collection(firestore, "newsletter_subscribers");
  const q = query(subscribersRef, where("isActive", "==", true));
  const snapshot = await getDocs(q);

  const subscribers: NewsletterSubscription[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    subscribers.push({
      id: doc.id,
      email: data.email,
      subscribedAt: data.subscribedAt.toDate(),
      isActive: data.isActive,
    });
  });

  return subscribers;
}
