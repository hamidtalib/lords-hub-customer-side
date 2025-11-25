"use client";

import { Gift } from "lucide-react";
import { useOffers } from "@/lib/hooks/useOffers";
import { Button } from "@/src/components/ui/button";

interface ViewOffersButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  text?: string;
}

/**
 * Button to manually open the offers modal
 * Can be placed anywhere in the app (header, footer, sidebar, etc.)
 * 
 * @example
 * // In header
 * <ViewOffersButton variant="outline" text="Special Offers" />
 * 
 * // Icon only
 * <ViewOffersButton size="icon" showIcon />
 */
export default function ViewOffersButton({
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
  text = "View Offers",
}: ViewOffersButtonProps) {
  const { openOffersModal, offers } = useOffers();

  // Don't show button if no offers available
  if (offers.length === 0) {
    return null;
  }

  return (
    <Button
      onClick={openOffersModal}
      variant={variant}
      size={size}
      className={className}
    >
      {showIcon && <Gift className="h-4 w-4 mr-2" />}
      {size !== "icon" && text}
    </Button>
  );
}
