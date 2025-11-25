"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showOffersModal, hideOffersModal } from "@/store/offers/offersSlice";

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
