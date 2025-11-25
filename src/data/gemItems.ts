/**
 * Lords Mobile Gem Calculator Data
 * All items organized by category with gem costs
 */

export interface GemItem {
  id: string;
  name: string;
  gemCost: number;
  category: string;
}

export type CategoryKey = 
  | "speedups"
  | "attack"
  | "defense"
  | "resources"
  | "chests"
  | "materials"
  | "familiar"
  | "monster";

export const CATEGORIES: Record<CategoryKey, string> = {
  speedups: "Speed Ups",
  attack: "Attack Boosts",
  defense: "Defense Boosts",
  resources: "Resources",
  chests: "Chests",
  materials: "Materials",
  familiar: "Familiar",
  monster: "Monster Hunt",
};

export const GEM_ITEMS: Record<CategoryKey, GemItem[]> = {
  speedups: [
    { id: "speed_1m", name: "1 Min Speed Up", gemCost: 1, category: "speedups" },
    { id: "speed_5m", name: "5 Min Speed Up", gemCost: 5, category: "speedups" },
    { id: "speed_15m", name: "15 Min Speed Up", gemCost: 15, category: "speedups" },
    { id: "speed_1h", name: "1 Hour Speed Up", gemCost: 60, category: "speedups" },
    { id: "speed_3h", name: "3 Hour Speed Up", gemCost: 180, category: "speedups" },
    { id: "speed_8h", name: "8 Hour Speed Up", gemCost: 480, category: "speedups" },
    { id: "speed_24h", name: "24 Hour Speed Up", gemCost: 1440, category: "speedups" },
    { id: "speed_3d", name: "3 Day Speed Up", gemCost: 4320, category: "speedups" },
    { id: "speed_7d", name: "7 Day Speed Up", gemCost: 10080, category: "speedups" },
    { id: "speed_30d", name: "30 Day Speed Up", gemCost: 43200, category: "speedups" },
  ],
  
  attack: [
    { id: "atk_boost_25", name: "25% Attack Boost", gemCost: 500, category: "attack" },
    { id: "atk_boost_50", name: "50% Attack Boost", gemCost: 1000, category: "attack" },
    { id: "atk_boost_100", name: "100% Attack Boost", gemCost: 2000, category: "attack" },
    { id: "army_boost", name: "Army Attack Boost", gemCost: 2000, category: "attack" },
    { id: "hero_atk", name: "Hero Attack Boost", gemCost: 800, category: "attack" },
    { id: "troop_atk", name: "Troop Attack Boost", gemCost: 1500, category: "attack" },
  ],
  
  defense: [
    { id: "def_boost_25", name: "25% Defense Boost", gemCost: 500, category: "defense" },
    { id: "def_boost_50", name: "50% Defense Boost", gemCost: 1000, category: "defense" },
    { id: "def_boost_100", name: "100% Defense Boost", gemCost: 2000, category: "defense" },
    { id: "hp_boost_25", name: "25% HP Boost", gemCost: 500, category: "defense" },
    { id: "hp_boost_50", name: "50% HP Boost", gemCost: 1000, category: "defense" },
    { id: "hp_boost_100", name: "100% HP Boost", gemCost: 2000, category: "defense" },
    { id: "hero_exp", name: "Hero EXP", gemCost: 300, category: "defense" },
    { id: "research_boost", name: "Research Boost", gemCost: 800, category: "defense" },
    { id: "construction_boost", name: "Construction Boost", gemCost: 800, category: "defense" },
  ],
  
  resources: [
    { id: "food_10k", name: "10K Food", gemCost: 10, category: "resources" },
    { id: "food_50k", name: "50K Food", gemCost: 50, category: "resources" },
    { id: "food_150k", name: "150K Food", gemCost: 150, category: "resources" },
    { id: "food_500k", name: "500K Food", gemCost: 500, category: "resources" },
    { id: "stone_10k", name: "10K Stone", gemCost: 10, category: "resources" },
    { id: "stone_50k", name: "50K Stone", gemCost: 50, category: "resources" },
    { id: "stone_150k", name: "150K Stone", gemCost: 150, category: "resources" },
    { id: "stone_500k", name: "500K Stone", gemCost: 500, category: "resources" },
    { id: "timber_10k", name: "10K Timber", gemCost: 10, category: "resources" },
    { id: "timber_50k", name: "50K Timber", gemCost: 50, category: "resources" },
    { id: "timber_150k", name: "150K Timber", gemCost: 150, category: "resources" },
    { id: "timber_500k", name: "500K Timber", gemCost: 500, category: "resources" },
    { id: "ore_10k", name: "10K Ore", gemCost: 10, category: "resources" },
    { id: "ore_50k", name: "50K Ore", gemCost: 50, category: "resources" },
    { id: "ore_150k", name: "150K Ore", gemCost: 150, category: "resources" },
    { id: "ore_500k", name: "500K Ore", gemCost: 500, category: "resources" },
    { id: "gold_10k", name: "10K Gold", gemCost: 20, category: "resources" },
    { id: "gold_50k", name: "50K Gold", gemCost: 100, category: "resources" },
    { id: "gold_150k", name: "150K Gold", gemCost: 300, category: "resources" },
  ],
  
  chests: [
    { id: "bronze_chest", name: "Bronze Chest", gemCost: 100, category: "chests" },
    { id: "silver_chest", name: "Silver Chest", gemCost: 300, category: "chests" },
    { id: "gold_chest", name: "Gold Chest", gemCost: 800, category: "chests" },
    { id: "epic_chest", name: "Epic Chest", gemCost: 2000, category: "chests" },
    { id: "legendary_chest", name: "Legendary Chest", gemCost: 5000, category: "chests" },
    { id: "mythic_chest", name: "Mythic Chest", gemCost: 10000, category: "chests" },
  ],
  
  materials: [
    { id: "material_common", name: "Common Material", gemCost: 50, category: "materials" },
    { id: "material_uncommon", name: "Uncommon Material", gemCost: 150, category: "materials" },
    { id: "material_rare", name: "Rare Material", gemCost: 400, category: "materials" },
    { id: "material_epic", name: "Epic Material", gemCost: 1000, category: "materials" },
    { id: "material_legendary", name: "Legendary Material", gemCost: 3000, category: "materials" },
    { id: "material_mythic", name: "Mythic Material", gemCost: 8000, category: "materials" },
    { id: "crafting_stone", name: "Crafting Stone", gemCost: 200, category: "materials" },
    { id: "upgrade_crystal", name: "Upgrade Crystal", gemCost: 500, category: "materials" },
  ],
  
  familiar: [
    { id: "familiar_exp", name: "Familiar EXP", gemCost: 150, category: "familiar" },
    { id: "familiar_skill", name: "Familiar Skill Unlock", gemCost: 500, category: "familiar" },
    { id: "familiar_fragment", name: "Familiar Fragment", gemCost: 300, category: "familiar" },
    { id: "familiar_egg", name: "Familiar Egg", gemCost: 1000, category: "familiar" },
    { id: "familiar_food", name: "Familiar Food", gemCost: 100, category: "familiar" },
    { id: "merge_stone", name: "Merge Stone", gemCost: 200, category: "familiar" },
  ],
  
  monster: [
    { id: "monster_energy", name: "Monster Hunt Energy", gemCost: 100, category: "monster" },
    { id: "monster_ticket", name: "Monster Hunt Ticket", gemCost: 250, category: "monster" },
    { id: "monster_boost", name: "Monster Hunt Boost", gemCost: 400, category: "monster" },
    { id: "labyrinth_ticket", name: "Labyrinth Ticket", gemCost: 300, category: "monster" },
    { id: "labyrinth_key", name: "Labyrinth Key", gemCost: 500, category: "monster" },
  ],
  

};

// Helper function to get all items
export function getAllItems(): GemItem[] {
  return Object.values(GEM_ITEMS).flat();
}

// Helper function to get items by category
export function getItemsByCategory(category: CategoryKey): GemItem[] {
  return GEM_ITEMS[category] || [];
}
