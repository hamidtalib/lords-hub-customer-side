import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { StoreProvider } from "@/src/components/providers/store-provider";
import { ToastProvider } from "@/src/components/providers/toast-provider";
import { FloatingChatButton } from "@/src/components/floating-chat-button";
import { FloatingOffersButton } from "@/src/components/floating-offers-button";
import SocialSidebar from "@/src/components/shared/SocialSidebar";
import OffersModal from "@/src/components/offers/OffersModal";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} font-sans antialiased`}>
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
