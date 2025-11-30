"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { showOffersModal, hideOffersModal } from "@/store/slices/offerSlice";

/**
 * Hook for managing offers modal
 * 
 * @returns Offers state and actions
 */
export function useOffers() {
  const dispatch = useAppDispatch();
  const { offers, showModal, hasSeenOffers } = useAppSelector((state) => state.offers);

  const openOffersModal = () => {
    dispatch(showOffersModal());
  };

  const closeOffersModal = () => {
    dispatch(hideOffersModal());
  };

  return {
    offers,
    showModal,
    hasSeenOffers,
    openOffersModal,
    closeOffersModal,
  };
}
