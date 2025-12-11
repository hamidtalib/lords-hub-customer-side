"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, MessageCircle, Send, Twitter, Mail } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Tooltip } from "@/src/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { subscribeNewsletter } from "@/store/thunks/newsletterThunk";
import { loadSocialMediaLinks } from "@/store/thunks/socialMediaThunk";
import {
  getSocialMediaUrl,
  SOCIAL_PLATFORMS,
} from "@/store/lib/utils/socialMediaUtils";

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
  const twitterUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.TWITTER) ?? undefined;
  const redditUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.REDDIT) ?? undefined;
  const discordUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.DISCORD) ?? undefined;
  const whatsappUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.WHATSAPP) ?? undefined;
  const emailUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.EMAIL) ?? undefined;
  const lineUrl: string | undefined =
    getSocialMediaUrl(links, SOCIAL_PLATFORMS.LINE) ?? undefined;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatch(subscribeNewsletter(email)).unwrap();
      toast.success(result);
      setEmail("");
    } catch (error: any) {
      toast.error(error || "An error occurred. Please try again.");
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
              width={80}
              height={80}
              className="mb-2 sm:w-[90px] sm:h-[90px]"
            />
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold max-w-xs">
              Your trusted marketplace for premium Lords Mobile accounts and
              services.
            </p>

            <div className="mt-4 sm:mt-6 flex justify-center md:justify-start gap-3 sm:gap-4 flex-wrap">
              <Tooltip content="Facebook">
                <Link
                  href={facebookUrl || "#"}
                  onClick={(e) => handleLinkClick(facebookUrl, "Facebook", e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Tooltip>
              <Tooltip content="Twitter">
                <Link
                  href={twitterUrl || "#"}
                  onClick={(e) => handleLinkClick(twitterUrl, "Twitter", e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Tooltip>
              <Tooltip content="Reddit">
                <Link
                  href={redditUrl || "#"}
                  onClick={(e) => handleLinkClick(redditUrl, "Reddit", e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                </Link>
              </Tooltip>
              <Tooltip content="Discord">
                <Link
                  href={discordUrl || "#"}
                  onClick={(e) => handleLinkClick(discordUrl, "Discord", e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Tooltip>
              <Tooltip content="WhatsApp">
                <Link
                  href={whatsappUrl || "#"}
                  onClick={(e) => handleLinkClick(whatsappUrl, "WhatsApp", e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                </Link>
              </Tooltip>
              <Tooltip content="Email">
                <Link
                  href={emailUrl || "#"}
                  onClick={(e) => handleLinkClick(emailUrl, "Email", e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Tooltip>
              <Tooltip content="Line">
                <Link
                  href={lineUrl || "#"}
                  onClick={(e) => handleLinkClick(lineUrl, "Line", e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391-.167.618-.58.618-1.01v-3.834c0-.632-.378-1.193-.971-1.436-.593-.244-1.043-.694-1.043-1.237 0-.632.45-1.145 1.043-1.145.593 0 1.043.513 1.043 1.145 0 .543-.45.993-1.043 1.237-.593.243-.971.804-.971 1.436v3.834c0 .43.227.843.618 1.01C19.73 19.156 24 15.125 24 10.314" />
                  </svg>
                </Link>
              </Tooltip>
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
                { label: "Privacy Policy", href: "/privacy" },
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
                className="btn-game font-bold w-full sm:w-auto"
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

        <div className="mt-8 sm:mt-12 border-t border-amber-500/30 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-slate-400 font-semibold">
          <p className="px-1">
            &copy; 2025 Lords Hub. All rights reserved. | Premium Gaming
            Marketplace
          </p>
        </div>
      </div>
    </footer>
  );
}
