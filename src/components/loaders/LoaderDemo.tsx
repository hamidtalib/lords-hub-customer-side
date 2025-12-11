"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  AccountCardSkeleton,
  ReviewCardSkeleton,
  MessageSkeleton,
  TableSkeleton,
  HeroSkeleton,
  StatsSkeleton,
  CategoryCardSkeleton,
  TestimonialSkeleton,
  ChatSkeleton,
  GalleryImageSkeleton,
  FormSkeleton,
  BotCardSkeleton,
} from "./index";

export function LoaderDemo() {
  const [activeLoader, setActiveLoader] = useState<string>("accounts");

  const loaders = {
    accounts: <AccountCardSkeleton count={6} />,
    reviews: <ReviewCardSkeleton count={3} />,
    messages: <MessageSkeleton count={5} />,
    table: <TableSkeleton rows={8} columns={5} />,
    hero: <HeroSkeleton />,
    stats: <StatsSkeleton count={4} />,
    categories: <CategoryCardSkeleton count={3} />,
    testimonials: <TestimonialSkeleton count={3} />,
    chat: <ChatSkeleton />,
    gallery: <GalleryImageSkeleton count={8} aspectRatio="square" />,
    form: <FormSkeleton fields={4} hasTextarea={true} hasSubmitButton={true} />,
    bots: <BotCardSkeleton count={6} />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black gradient-text mb-8 text-center">
          Skeleton Loader Demo
        </h1>
        
        {/* Loader Selection */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(loaders).map((loader) => (
            <Button
              key={loader}
              onClick={() => setActiveLoader(loader)}
              className={`${
                activeLoader === loader
                  ? "btn-game"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              } text-sm`}
            >
              {loader.charAt(0).toUpperCase() + loader.slice(1)}
            </Button>
          ))}
        </div>

        {/* Active Loader Display */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border-2 border-amber-500/30">
          <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">
            {activeLoader.charAt(0).toUpperCase() + activeLoader.slice(1)} Skeleton
          </h2>
          {loaders[activeLoader as keyof typeof loaders]}
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-slate-800/30 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold mb-4 text-amber-400">Usage Example:</h3>
          <pre className="bg-slate-900 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`import { ${activeLoader.charAt(0).toUpperCase() + activeLoader.slice(1)}Skeleton } from "@/src/components/loaders";

// In your component
{loading ? (
  <${activeLoader.charAt(0).toUpperCase() + activeLoader.slice(1)}Skeleton ${
  activeLoader === 'accounts' ? 'count={6}' :
  activeLoader === 'reviews' ? 'count={3}' :
  activeLoader === 'table' ? 'rows={8} columns={5}' :
  activeLoader === 'gallery' ? 'count={8} aspectRatio="square"' :
  activeLoader === 'form' ? 'fields={4} hasTextarea={true}' :
  ''
} />
) : (
  // Your actual content
)}`}
          </pre>
        </div>
      </div>
    </div>
  );
}