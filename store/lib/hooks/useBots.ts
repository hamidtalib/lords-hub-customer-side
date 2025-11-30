"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchBotsByType, fetchAllBots, BotType } from "@/store/thunks/botsThunk";
import { clearError } from "@/store/slices/botsSlice";

/**
 * Hook for managing bots state and actions
 * 
 * @returns Bots state and actions
 */
export function useBots() {
  const dispatch = useAppDispatch();
  const { botsByType, allBots, lastDocs, hasMore, loading, error } = useAppSelector(
    (state) => state.bots
  );

  const loadBotsByType = (type: BotType) => {
    dispatch(fetchBotsByType({ type }));
  };

  const loadMoreBots = (type: BotType) => {
    const lastDoc = lastDocs[type];
    if (lastDoc && hasMore[type]) {
      dispatch(fetchBotsByType({ type, lastDoc }));
    }
  };

  const loadAllBots = () => {
    dispatch(fetchAllBots());
  };

  const clearBotError = () => {
    dispatch(clearError());
  };

  return {
    botsByType,
    allBots,
    hasMore,
    loading,
    error,
    loadBotsByType,
    loadMoreBots,
    loadAllBots,
    clearBotError,
  };
}
