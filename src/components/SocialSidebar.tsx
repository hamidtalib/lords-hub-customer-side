"use client";

import { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  Mail,
  Instagram,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getSocialMediaUrl,
  SOCIAL_PLATFORMS,
} from "@/store/lib/utils/socialMediaUtils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { loadSocialMediaLinks } from "@/store/thunks/socialMediaThunk";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url?: string;
  color: string;
}

interface SocialSidebarProps {
  iconColor?: string;
  position?: "left" | "right";
  icons?: SocialLink[];
}

// Default social media icons
const defaultIcons: SocialLink[] = [
  {
    name: "Facebook",
    icon: <Facebook className="w-full h-full" />,
    color: "#1877F2",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-full h-full" />,
    color: "#1DA1F2",
  },
  {
    name: "Reddit",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
    color: "#FF4500",
  },
  {
    name: "Discord",
    icon: <MessageCircle className="w-full h-full" />,
    color: "#5865F2",
  },
  {
    name: "WhatsApp",
    icon: <Send className="w-full h-full" />,
    color: "#25D366",
  },
  {
    name: "Email",
    icon: <Mail className="w-full h-full" />,
    color: "#EA4335",
  },
];

export default function SocialSidebar({
  iconColor = "#F6A600",
  position = "left",
  icons = defaultIcons,
}: SocialSidebarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { links } = useAppSelector((state) => state.socialMedia);
  console.log("links: ", links);

  // Load social media links from Redux on mount
  useEffect(() => {
    dispatch(loadSocialMediaLinks());
  }, [dispatch]);

  const handleSocialClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    socialName: string
  ) => {
    const platformMap: Record<string, string> = {
      Facebook: SOCIAL_PLATFORMS.FACEBOOK,
      Twitter: SOCIAL_PLATFORMS.TWITTER,
      Instagram: SOCIAL_PLATFORMS.INSTAGRAM,
      Reddit: SOCIAL_PLATFORMS.REDDIT,
      Discord: SOCIAL_PLATFORMS.DISCORD,
      WhatsApp: SOCIAL_PLATFORMS.WHATSAPP,
      Email: SOCIAL_PLATFORMS.EMAIL,
    };

    const platform = platformMap[socialName];
    if (platform) {
      const url = getSocialMediaUrl(links, platform);
      if (!url) {
        e.preventDefault();
        toast.error(`${socialName} link not added by admin yet`);
      }
    }
  };

  const positionClasses =
    position === "left" ? "left-1 lg:left-2" : "right-1 lg:right-2";

  return (
    <div
      className={`fixed ${positionClasses} z-40`}
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        maxHeight: "calc(100vh - 120px)",
      }}
    >
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 shadow-2xl border border-amber-500/20">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {icons.map((social, index) => {
            const linkUrl =
              getSocialMediaUrl(
                links,
                social.name as keyof typeof SOCIAL_PLATFORMS
              ) || social.url;
            return (
              <a
                key={social.name}
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                onClick={(e) => handleSocialClick(e, social.name)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={social.name}
              >
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-md flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
                  style={{
                    backgroundColor:
                      hoveredIndex === index
                        ? social.color
                        : "rgba(15, 23, 42, 0.8)",
                    transform:
                      hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    color: hoveredIndex === index ? "#ffffff" : iconColor,
                  }}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5">
                    {social.icon}
                  </div>
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute ${
                    position === "left" ? "left-full ml-2" : "right-full mr-2"
                  } top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none ${
                    hoveredIndex === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  style={{
                    minWidth: "fit-content",
                  }}
                >
                  {social.name}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      position === "left" ? "-left-1" : "-right-1"
                    } w-1.5 h-1.5 bg-slate-800 rotate-45`}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
