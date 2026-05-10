import type { Rank, RaceData, Modifier, Task, RankTier } from '../types';

export const COLORS = {
  bg_dark: "#0D0D0D",
  bg_darker: "#050505",
  bg_card: "#151515",
  bg_hover: "#1F1F1F",
  gold: "#C9A227",
  gold_dim: "#8B7355",
  gold_bright: "#FFD700",
  cyan_wind: "#00E5FF",
  flame: "#FF6B35",
  frost: "#7DD3FC",
  shadow: "#8B5CF6",
  blood: "#DC143C",
  thunder: "#FFEA00",
  text_main: "#E8E8E8",
  text_dim: "#666666",
  text_gold: "#C9A227",
  border: "#2A2A2A",
  iron: "#4A4A4A",
} as const;

export const RACES: RaceData[] = [
  "Adret (14.5%)",
  "Celtor (14.5%)",
  "Etrean (14.5%)",
  "Canor (12.7%)",
  "Gremor (10.9%)",
  "Khan (7.27%)",
  "Felinor (7.27%)",
];

export const WEAPON_TYPES = ["Heavy", "Light", "Medium", "Puños"] as const;

export const ATTUNEMENTS = [
  "Galebreath",
  "Flamecharm",
  "Frostdraw",
  "Thundercall",
  "Shadowcast",
  "Ironsing",
  "Bloodrend",
] as const;

export const MODIFIERS: Modifier[] = [
  { id: "fragile_heart", name: "Fragile Heart", multiplier: 0.5 },
  { id: "crestfallen", name: "Crestfallen", multiplier: 0.1 },
  { id: "deep_champion", name: "Deep Champion", multiplier: 0.2 },
  { id: "dissonant", name: "Dissonant", multiplier: 0.3 },
  { id: "hollow", name: "Hollow", multiplier: 0.1 },
  { id: "slowburn", name: "Slowburn", multiplier: 0.1 },
  { id: "dealbreaker", name: "Dealbreaker", multiplier: 0.05 },
  { id: "loose_change", name: "Loose Change", multiplier: 0.2 },
  { id: "high_velocity", name: "High Velocity", multiplier: 0.1 },
  { id: "ironwoken", name: "Ironwoken", multiplier: 0.1 },
  { id: "one_bit", name: "One Bit", multiplier: 0.2 },
  { id: "destined", name: "Destined", multiplier: 0.2 },
  { id: "vow_of_thorns", name: "Vow of Thorns", multiplier: 0.05 },
];

export const TASKS: Task[] = [
  { id: "craft_food", name: "Craft a Food item.", value: 1, category: "Crafting" },
  { id: "catch_fish", name: "Catch a Fish.", value: 1, category: "Crafting" },
  { id: "modify_mantra", name: "Modify a Mantra.", value: 1, category: "Crafting" },
  { id: "turn_pure_ore", name: "Turn in a Pure Ore to a Blacksmith.", value: 1, category: "Crafting" },
  { id: "win_chime", name: "Win a Chime of Conflict match.", value: 1, category: "PvP" },
  { id: "drink_flask", name: "Drink an Attribute Flask.", value: 2, category: "Items" },
  { id: "craft_master_armor", name: "Craft a Master Armor.", value: 2, category: "Crafting" },
  { id: "use_deep_shrine", name: "Use a Deep Shrine.", value: 2, category: "Special" },
  { id: "deal_miserables", name: "Make a deal with Misérables.", value: 2, category: "Special" },
  { id: "bargain_yunshul", name: "Bargain with Yun'Shul.", value: 2, category: "Special" },
  { id: "unbound_attribute", name: "Unbound an Attribute.", value: 5, category: "Progression" },
  { id: "obtain_oath", name: "Obtain an Oath.", value: 5, category: "Progression" },
  { id: "soulbind", name: "Soul-bound an enchanted or legendary item.", value: 5, category: "Progression" },
  { id: "use_enchant_stone", name: "Enchant an Item with an Enchant Stone or Enchant Grease.", value: 5, category: "Items" },
  { id: "enchant_laplace", name: "Obtain an enchant from Laplace.", value: 5, category: "Items" },
  { id: "clear_world_event", name: "Clear a World Event.", value: 5, category: "Special" },
  { id: "use_pluripotent", name: "Use a Pluripotent Alloy to alloy a weapon.", value: 5, category: "Items" },
  { id: "obtain_murmur", name: "Obtain a Murmur.", value: 5, category: "Progression" },
  { id: "boss_dread_serpent", name: "Defeat the Dread Serpent OR the Doom of Caeranthil.", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_duke_erisia", name: "Defeat Duke Erisia.", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_ferryman", name: "Defeat The Ferryman.", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_chaser", name: "Defeat Chaser, Scholar of the Crimson Contract.", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_primadon", name: "Defeat Primadon, Titan of the East OR Elder Primadon, The Titan Warlord.", value: 5, category: "Bosses", color: "blood" },
  { id: "scion_ethiron", name: "Defeat the Scion of Ethiron.", value: 10, category: "Bosses", color: "blood" },
  { id: "hell_mode", name: "Complete Hell Mode.", value: 10, category: "Endgame" },
  { id: "hookless_layer2", name: "Complete Layer 2 floor 1 without a Light Hook.", value: 10, category: "Endgame" },
  { id: "power", name: "Power up.", value: 15, category: "Progression" },
  { id: "resonance", name: "Obtain a Resonance.", value: 15, category: "Progression" },
];

export const RANK_THRESHOLDS: Record<RankTier, number> = {
  W: 427,
  S: 140,
  A: 112,
  B: 87,
  C: 60,
  D: 30,
  E: 1,
};

export const RANK_COLORS: Record<RankTier, string> = {
  W: "#FFD700",
  S: "#00E5FF",
  A: "#C9A227",
  B: "#8B7355",
  C: "#666666",
  D: "#4A4A4A",
  E: "#2A2A2A",
};

export const RANKS: Rank[] = [
  { name: "W", threshold: 427 },
  { name: "S", threshold: 140 },
  { name: "A", threshold: 112 },
  { name: "B", threshold: 87 },
  { name: "C", threshold: 60 },
  { name: "D", threshold: 30 },
  { name: "E", threshold: 0 },
];

export const TASK_CATEGORIES = [
  "Progression",
  "Crafting",
  "PvP",
  "Items",
  "Special",
  "Bosses",
  "Endgame",
] as const;