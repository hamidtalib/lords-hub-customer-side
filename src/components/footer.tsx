"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle, Send } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { subscribeToNewsletter } from "@/store/lib/firebaseNewsletter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadSocialMediaLinks } from "@/store/socialMedia/socialMediaSlice";
import {
  getSocialMediaUrl,
  SOCIAL_PLATFORMS,
} from "@/lib/utils/socialMediaUtils";

import logo from "@/public/images/lords-hub-logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const { links } = useAppSelector((state) => state.socialMedia);

  useEffect(() => {
    dispatch(loadSocialMediaLinks());
  }, [dispatch]);

  const facebookUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.FACEBOOK) ?? undefined;
  const instagramUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.INSTAGRAM) ?? undefined;
  const whatsappUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.WHATSAPP) ?? undefined;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkClick = (
    url?: string,
    platform?: string,
    e?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!url) {
      e?.preventDefault();
      toast.error(`${platform} link not added by admin yet`);
    }
  };

  return (
    <footer className="border-t-2 border-amber-500/30 bg-gradient-to-b from-slate-800/90 to-slate-900/90">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 pt-12 sm:pt-16 pb-6 sm:pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-4 text-center md:text-left">
          {/* LOGO + SOCIAL LINKS */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={logo}
              alt="Lords Hub Logo"
              width={60}
              height={60}
              className="mb-2 sm:w-[70px] sm:h-[70px]"
            />
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold max-w-xs">
              Your trusted marketplace for premium Lords Mobile accounts and
              services.
            </p>

            <div className="mt-4 sm:mt-6 flex justify-center md:justify-start gap-3 sm:gap-4">
              <Link
                href={facebookUrl || "#"}
                onClick={(e) => handleLinkClick(facebookUrl, "Facebook", e)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href={instagramUrl || "#"}
                onClick={(e) => handleLinkClick(instagramUrl, "Instagram", e)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href={whatsappUrl || "#"}
                onClick={(e) => handleLinkClick(whatsappUrl, "WhatsApp", e)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-200 mb-3 sm:mb-4 text-sm sm:text-base">
              Products
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {["Accounts", "Gems", "Diamonds", "Bot Services"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s/g, "")}`}
                    className="text-slate-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-1 transform inline-block font-semibold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-200 mb-3 sm:mb-4 text-sm sm:text-base">
              Support
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Blog", href: "/blog" },
                { label: "Reviews", href: "/reviews" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-1 transform inline-block font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-200 mb-3 sm:mb-4 text-sm sm:text-base">
              Subscribe
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4 font-semibold text-center md:text-left max-w-xs">
              Get updates on new accounts and deals.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 w-full max-w-xs"
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="border-2 border-amber-500/50 focus:border-amber-400 bg-slate-700/50 text-white placeholder:text-slate-400 text-xs sm:text-sm font-semibold transition-all duration-300 flex-1"
              />
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="btn-secondary font-bold w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="text-xs">...</span>
                ) : (
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 border-t border-amber-500/30 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-400 font-semibold">
          <p className="px-2">
            &copy; 2025 Lords Hub. All rights reserved. | Premium Gaming
            Marketplace
          </p>
        </div>
      </div>
    </footer>
  );
}
