"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { loadSocialMediaLinks } from "@/store/thunks/socialMediaThunk";
import { getSocialMediaUrl, SOCIAL_PLATFORMS } from "@/store/lib/utils/socialMediaUtils";
import { toast } from "react-toastify";

interface SocialButtonsProps {
  buttons: Array<{
    label: string;
    url: string;
    type?: "primary" | "secondary";
  }>;
}

export function SocialButtons({ buttons }: SocialButtonsProps) {
  const dispatch = useAppDispatch();
  const { links } = useAppSelector((state) => state.socialMedia);

  // Load social media links on mount
  useEffect(() => {
    dispatch(loadSocialMediaLinks());
  }, [dispatch]);

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, button: any) => {
    let actualUrl = button.url;
    
    // Check if this is a WhatsApp or Telegram button and get the actual URL from admin config
    if (button.label === "WhatsApp") {
      const whatsappUrl = getSocialMediaUrl(links, SOCIAL_PLATFORMS.WHATSAPP);
      if (!whatsappUrl) {
        e.preventDefault();
        toast.error("WhatsApp link not added by admin yet");
        return;
      }
      actualUrl = whatsappUrl;
    } else if (button.label === "Telegram") {
      const telegramUrl = getSocialMediaUrl(links, SOCIAL_PLATFORMS.TELEGRAM);
      if (!telegramUrl) {
        e.preventDefault();
        toast.error("Telegram link not added by admin yet");
        return;
      }
      actualUrl = telegramUrl;
    }

    // Update the href dynamically
    (e.target as HTMLAnchorElement).href = actualUrl;
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {buttons.map((button, idx) => (
        <a
          key={idx}
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleSocialClick(e, button)}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
            button.type === "primary"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {button.label}
        </a>
      ))}
    </div>
  );
}