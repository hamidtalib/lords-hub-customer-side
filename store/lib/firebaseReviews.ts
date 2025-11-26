import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  Timestamp,
  limit,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
  isApproved?: boolean;
  createdAt?: Date;
}

/**
 * Submit a new review to Firestore
 * Reviews are pending approval by default
 *
 * @param {Object} reviewData - Review data
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export async function submitReview(reviewData: {
  name: string;
  rating: number;
  message: string;
}): Promise<{ success: boolean; message: string; reviewId?: string }> {
  try {
    // Validate input
    if (!reviewData.name || !reviewData.message) {
      return { success: false, message: "Please fill in all fields" };
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return { success: false, message: "Rating must be between 1 and 5" };
    }

    // Add review to Firestore
    const reviewsRef = collection(firestore, "reviews");
    const docRef = await addDoc(reviewsRef, {
      name: reviewData.name.trim(),
      rating: reviewData.rating,
      message: reviewData.message.trim(),
      isApproved: true, // Auto-approve for now, can be changed to false for moderation
      createdAt: Timestamp.now(),
    });
    
    return {
      success: true,
      message: "Thank you for your review!",
      reviewId: docRef.id,
    };
  } catch (error) {
    console.error("Review submission error:", error);
    return {
      success: false,
      message: "Failed to submit review. Please try again.",
    };
  }
}

/**
 * Fetch approved reviews from Firestore
 *
 * @param {number} maxResults - Maximum number of reviews to fetch
 * @returns {Promise<Review[]>}
 */
export async function fetchApprovedReviews(
  maxResults: number = 50
): Promise<Review[]> {
  try {
    const reviewsRef = collection(firestore, "reviews");
    const q = query(
      reviewsRef,
      where("isApproved", "==", true),
      orderBy("createdAt", "desc"),
      limit(maxResults)
    );

    const snapshot = await getDocs(q);
    const reviews: Review[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        name: data.name,
        rating: data.rating,
        message: data.message,
        date: data.createdAt.toDate().toISOString(),
        isApproved: data.isApproved,
        createdAt: data.createdAt.toDate(),
      });
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

/**
 * Subscribe to real-time reviews updates
 *
 * @param {Function} callback - Callback function to handle reviews updates
 * @returns {Function} Unsubscribe function
 */
export function subscribeToReviews(
  callback: (reviews: Review[]) => void,
  maxResults: number = 50
): () => void {
  const reviewsRef = collection(firestore, "reviews");
  const q = query(
    reviewsRef,
    where("isApproved", "==", true),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const reviews: Review[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        reviews.push({
          id: doc.id,
          name: data.name,
          rating: data.rating,
          message: data.message,
          date: data.createdAt.toDate().toISOString(),
          isApproved: data.isApproved,
          createdAt: data.createdAt.toDate(),
        });
      });
      callback(reviews);
    },
    (error) => {
      console.error("Error in reviews subscription:", error);
      callback([]);
    }
  );

  return unsubscribe;
}

/**
 * Get all reviews including pending (Admin only)
 *
 * @returns {Promise<Review[]>}
 */
export async function getAllReviews(): Promise<Review[]> {
  try {
    const reviewsRef = collection(firestore, "reviews");
    const q = query(reviewsRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    const reviews: Review[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        name: data.name,
        rating: data.rating,
        message: data.message,
        date: data.createdAt.toDate().toISOString(),
        isApproved: data.isApproved,
        createdAt: data.createdAt.toDate(),
      });
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }
}

/**
 * Calculate average rating from reviews
 *
 * @param {Review[]} reviews - Array of reviews
 * @returns {number} Average rating
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}
