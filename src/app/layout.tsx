import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { StoreProvider } from "@/store/providers/store-provider";
import { ToastProvider } from "@/store/providers/toast-provider";
import { FloatingChatButton } from "@/src/components/floating-chat-button";
import { FloatingOffersButton } from "@/src/components/floating-offers-button";
import SocialSidebar from "@/src/components/SocialSidebar";
import OffersModal from "@/src/components/offers/OffersModal";

const fontClass = "font-sans";

export const metadata: Metadata = {
  title: "Lords Hub - Premium Lords Mobile Accounts & Services",
  description:
    "Buy and sell premium Lords Mobile accounts, gems, diamonds, and bot services. Your trusted marketplace for Lords Mobile gaming.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fontClass} antialiased`} suppressHydrationWarning>
        <StoreProvider>
          {children}
          <SocialSidebar position="left" iconColor="#F6A600" />
          <FloatingOffersButton />
          <FloatingChatButton />
          <OffersModal />
          <Analytics />
        </StoreProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
