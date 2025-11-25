"use client";

import { useState } from "react";
import { 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Send, 
  Mail,
  Share2
} from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

interface SocialSidebarProps {
  iconColor?: string;
  position?: "left" | "right";
  icons?: SocialLink[];
}

const defaultIcons: SocialLink[] = [
  {
    name: "Facebook",
    icon: <Facebook className="w-full h-full" />,
    url: "https://facebook.com",
    color: "#1877F2",
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-full h-full" />,
    url: "https://twitter.com",
    color: "#1DA1F2",
  },
  {
    name: "Reddit",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
    url: "https://reddit.com",
    color: "#FF4500",
  },
  {
    name: "Discord",
    icon: <MessageCircle className="w-full h-full" />,
    url: "https://discord.com",
    color: "#5865F2",
  },
  {
    name: "WhatsApp",
    icon: <Send className="w-full h-full" />,
    url: "https://wa.me/",
    color: "#25D366",
  },
  {
    name: "Email",
    icon: <Mail className="w-full h-full" />,
    url: "mailto:info@lordshub.com",
    color: "#EA4335",
  },
];

export default function SocialSidebar({
  iconColor = "#F6A600",
  position = "left",
  icons = defaultIcons,
}: SocialSidebarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const positionClasses = position === "left" 
    ? "left-1 lg:left-2" 
    : "right-1 lg:right-2";

  return (
    <div
      className={`fixed ${positionClasses} z-40 block`}
      style={{ 
        top: "50%",
        transform: "translateY(-50%)",
        marginTop: "40px", // Offset for navbar height
        maxHeight: "calc(100vh - 120px)" // Account for navbar and bottom spacing
      }}
    >
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 shadow-2xl border border-amber-500/20">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {icons.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={social.name}
            >
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-md flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
                style={{
                  backgroundColor: hoveredIndex === index ? social.color : "rgba(15, 23, 42, 0.8)",
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  color: hoveredIndex === index ? "#ffffff" : iconColor,
                }}
              >
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5">
                  {social.icon}
                </div>
              </div>

              {/* Tooltip - only show on larger screens */}
              <div
                className={`absolute ${
                  position === "left" ? "left-full ml-2" : "right-full mr-2"
                } top-1/2 -translate-y-1/2 bg-slate-800 text-white px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none hidden sm:block ${
                  hoveredIndex === index
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                {social.name}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    position === "left" ? "-left-1" : "-right-1"
                  } w-1.5 h-1.5 bg-slate-800 rotate-45`}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
