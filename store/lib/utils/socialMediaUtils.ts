import { SocialMediaLink } from "@/store/thunks/socialMediaThunk";

/**
 * Get URL for a specific social media platform
 * @param links - Array of social media links from Redux store
 * @param platform - Platform name (case-insensitive)
 * @returns URL string or null if not found
 */
export const getSocialMediaUrl = (
  links: SocialMediaLink[],
  platform: string
): string | null => {
  const link = links.find(
    (link) =>
      link.platform.toLowerCase() === platform.toLowerCase() &&
      link.isActive !== false
  );
  return link?.url || null;
};

/**
 * Platform name mapping for consistent naming
 */
export const SOCIAL_PLATFORMS = {
  FACEBOOK: "Facebook",
  TWITTER: "Twitter",
  INSTAGRAM: "Instagram",
  REDDIT: "Reddit",
  DISCORD: "Discord",
  WHATSAPP: "Whatsapp",
  TELEGRAM: "Telegram",
  EMAIL: "Email",
} as const;
