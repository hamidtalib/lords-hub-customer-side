export interface AccountDetails {
  id: string;
  name: string;
  description: string[];
  mainImage: string;
  galleryImages: string[];
  price: number;
  category: "restricted" | "open";
}

export const accountsData: AccountDetails[] = [
  {
    id: "acc1",
    name: "Legendary T5 Account - 500M Might",
    description: [
      "500M+ Total Might",
      "Full T5 Troops Unlocked",
      "Maxed Research Trees",
      "Legendary Heroes Collection",
      "Premium Gear Sets",
      "Castle Level 25",
      "VIP 15 Active",
      "Guild Coins: 500K+",
      "Gems: 100K+",
      "Safe Transfer Guaranteed",
    ],
    mainImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
    ],
    price: 1500,
    category: "restricted",
  },
  {
    id: "acc2",
    name: "Elite Open Kingdom Account - 300M",
    description: [
      "300M+ Total Might",
      "T4 Troops Maxed",
      "Advanced Research",
      "Epic Heroes Unlocked",
      "Castle Level 24",
      "VIP 12 Active",
      "Guild Coins: 300K+",
      "Gems: 50K+",
      "Open Kingdom Ready",
      "Instant Transfer",
    ],
    mainImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    ],
    price: 800,
    category: "open",
  },
  {
    id: "acc3",
    name: "Premium Starter Account - 150M",
    description: [
      "150M+ Total Might",
      "T3 Troops Ready",
      "Essential Research Done",
      "Rare Heroes Collection",
      "Castle Level 22",
      "VIP 10 Active",
      "Guild Coins: 150K+",
      "Gems: 25K+",
      "Perfect for Growth",
      "Secure Transfer",
    ],
    mainImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    ],
    price: 400,
    category: "restricted",
  },
];

export function getAccountById(id: string): AccountDetails | undefined {
  return accountsData.find((account) => account.id === id);
}

export function getAccountsByCategory(category: "restricted" | "open"): AccountDetails[] {
  return accountsData.filter((account) => account.category === category);
}
