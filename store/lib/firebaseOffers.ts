/**
 * Firebase Offers Service
 * 
 * This file contains functions for managing offers in Firebase.
 * Currently using dummy data in offersSlice.ts
 * 
 * To enable Firebase-managed offers:
 * 1. Uncomment the functions below
 * 2. Create 'offers' collection in Firestore
 * 3. Update offersSlice.ts to use fetchActiveOffers
 * 4. Build admin panel to manage offers
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  Unsubscribe
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "./firebase";
import { Offer } from "../offers/offersSlice";

export interface FirestoreOffer {
  id: string;
  name: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  productId: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Fetch all offers from Firestore
 * 
 * @returns {Promise<FirestoreOffer[]>} Array of all offers
 */
export async function fetchAllOffers(): Promise<FirestoreOffer[]> {
  try {
    const offersRef = collection(firestore, "offers");
    const snapshot = await getDocs(offersRef);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreOffer[];
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
}

/**
 * Realtime listener for all offers
 * 
 * @param callback - Function to call with updated offers
 * @param onError - Optional error handler
 * @returns Unsubscribe function
 */
export function subscribeToOffers(
  callback: (offers: FirestoreOffer[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const offersRef = collection(firestore, "offers");

  return onSnapshot(
    offersRef,
    (snapshot) => {
      const offers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FirestoreOffer[];
      callback(offers);
    },
    (error) => {
      console.error("Error in offers realtime listener:", error);
      if (onError) onError(error);
    }
  );
}

/**
 * Fetch all active offers from Firestore
 * Only returns offers that are active and not expired
 * 
 * @returns {Promise<Offer[]>} Array of active offers
 */
export async function fetchActiveOffers(): Promise<Offer[]> {
  const offersRef = collection(firestore, "offers");
  const now = Timestamp.now();
  
  // Query for active offers
  const q = query(
    offersRef,
    where("isActive", "==", true),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  const offers: Offer[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    
    // Check if offer is still valid
    if (!data.validUntil || data.validUntil.toDate() > new Date()) {
      offers.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        ctaText: data.ctaText,
        ctaLink: data.ctaLink,
        validUntil: data.validUntil?.toDate(),
      });
    }
  });

  return offers;
}

/**
 * Create a new offer (Admin only)
 * 
 * @param {Omit<Offer, "id">} offerData - Offer data without ID
 * @returns {Promise<string>} The created offer ID
 */
export async function createOffer(offerData: Omit<Offer, "id">): Promise<string> {
  const offersRef = collection(firestore, "offers");
  
  const docRef = await addDoc(offersRef, {
    ...offerData,
    validUntil: offerData.validUntil ? Timestamp.fromDate(offerData.validUntil) : null,
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef.id;
}

/**
 * Update an existing offer (Admin only)
 * 
 * @param {string} offerId - Offer ID to update
 * @param {Partial<Offer>} updates - Fields to update
 */
export async function updateOffer(
  offerId: string,
  updates: Partial<Omit<Offer, "id">>
): Promise<void> {
  const offerRef = doc(firestore, "offers", offerId);
  
  const updateData: any = {
    ...updates,
    updatedAt: Timestamp.now(),
  };

  if (updates.validUntil) {
    updateData.validUntil = Timestamp.fromDate(updates.validUntil);
  }

  await updateDoc(offerRef, updateData);
}

/**
 * Delete an offer (Admin only)
 * 
 * @param {string} offerId - Offer ID to delete
 */
export async function deleteOffer(offerId: string): Promise<void> {
  const offerRef = doc(firestore, "offers", offerId);
  await deleteDoc(offerRef);
}

/**
 * Toggle offer active status (Admin only)
 * 
 * @param {string} offerId - Offer ID
 * @param {boolean} isActive - New active status
 */
export async function toggleOfferStatus(
  offerId: string,
  isActive: boolean
): Promise<void> {
  const offerRef = doc(firestore, "offers", offerId);
  await updateDoc(offerRef, {
    isActive,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Upload offer image to Firebase Storage
 * 
 * @param {File} file - Image file to upload
 * @param {string} offerId - Offer ID for organizing storage
 * @returns {Promise<string>} Download URL of uploaded image
 */
export async function uploadOfferImage(
  file: File,
  offerId: string
): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `offers/${offerId}/${fileName}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}

/**
 * Get all offers (Admin only - includes inactive)
 * 
 * @returns {Promise<Offer[]>} Array of all offers
 */
export async function getAllOffers(): Promise<Offer[]> {
  const offersRef = collection(firestore, "offers");
  const q = query(offersRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);
  const offers: Offer[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    offers.push({
      id: doc.id,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
      validUntil: data.validUntil?.toDate(),
    });
  });

  return offers;
}

/**
 * Get a single offer by ID
 * 
 * @param {string} offerId - Offer ID
 * @returns {Promise<Offer | null>} Offer data or null if not found
 */
export async function getOfferById(offerId: string): Promise<Offer | null> {
  const offerRef = doc(firestore, "offers", offerId);
  const offerSnap = await getDoc(offerRef);

  if (!offerSnap.exists()) {
    return null;
  }

  const data = offerSnap.data();
  return {
    id: offerSnap.id,
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    ctaText: data.ctaText,
    ctaLink: data.ctaLink,
    validUntil: data.validUntil?.toDate(),
  };
}

/**
 * Example: How to use in offersSlice.ts
 * 
 * import { createAsyncThunk } from "@reduxjs/toolkit";
 * import { fetchActiveOffers } from "@/store/lib/firebaseOffers";
 * 
 * export const loadOffers = createAsyncThunk(
 *   "offers/load",
 *   async () => {
 *     const offers = await fetchActiveOffers();
 *     return offers;
 *   }
 * );
 * 
 * // In extraReducers:
 * builder.addCase(loadOffers.fulfilled, (state, action) => {
 *   state.offers = action.payload;
 * });
 */
