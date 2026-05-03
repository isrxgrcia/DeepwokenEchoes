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
  { id: "power", name: "Power 20", value: 15, category: "Progresión" },
  { id: "unbound_attribute", name: "Unbind Atributo", value: 5, category: "Progresión" },
  { id: "obtain_oath", name: "Obtener Oath", value: 5, category: "Progresión" },
  { id: "soulbind", name: "Soul-bind Item", value: 5, category: "Progresión" },
  { id: "obtain_murmur", name: "Obtener Murmur", value: 5, category: "Progresión" },
  { id: "resonance", name: "Obtener Resonance", value: 15, category: "Progresión" },
  { id: "cook_food", name: "Cocinar Comida", value: 1, category: "Crafting" },
  { id: "catch_fish", name: "Pescar", value: 1, category: "Crafting" },
  { id: "modify_mantra", name: "Modificar Mantra", value: 1, category: "Crafting" },
  { id: "turn_pure_ore", name: "Entregar Mineral Puro", value: 1, category: "Crafting" },
  { id: "craft_master_armor", name: "Craft Armadura Master", value: 2, category: "Crafting" },
  { id: "win_chime", name: "Ganar Chime of Conflict", value: 1, category: "PvP" },
  { id: "drink_flask", name: "Beber Flask de Atributo", value: 2, category: "Items" },
  { id: "use_enchant_stone", name: "Usar Enchant Stone", value: 5, category: "Items" },
  { id: "enchant_laplace", name: "Enchant de Laplace", value: 5, category: "Items" },
  { id: "use_pluripotent", name: "Usar Pluripotent Alloy", value: 5, category: "Items" },
  { id: "use_deep_shrine", name: "Usar Deep Shrine", value: 2, category: "Special" },
  { id: "deal_miserables", name: "Tratar con Misérables", value: 2, category: "Special" },
  { id: "bargain_yunshul", name: "Negociar con Yun'Shul", value: 2, category: "Special" },
  { id: "deepshore_fossil", name: "Obtener Deepshore Fossil", value: 5, category: "Special" },
  { id: "boss_dread_serpent", name: "Derrotar Dread Serpent", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_duke_erisia", name: "Derrotar Duke Erisia", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_chaser", name: "Derrotar Chaser", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_primadon", name: "Derrotar Primadon", value: 5, category: "Bosses", color: "blood" },
  { id: "boss_ferryman", name: "Derrotar Ferryman", value: 5, category: "Bosses", color: "blood" },
  { id: "scion_ethiron", name: "Derrotar Scion of Ethiron", value: 10, category: "Bosses", color: "blood" },
  { id: "hell_mode", name: "Completar Hell Mode", value: 10, category: "Endgame" },
  { id: "hookless_layer2", name: "Layer 2 Floor 1 sin Light Hook", value: 10, category: "Endgame" },
];

export const RANK_THRESHOLDS: Record<RankTier, number> = {
  W: 140,
  S: 112,
  A: 87,
  B: 60,
  C: 30,
  D: 1,
  E: 0,
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
  { name: "W", threshold: 140 },
  { name: "S", threshold: 112 },
  { name: "A", threshold: 87 },
  { name: "B", threshold: 60 },
  { name: "C", threshold: 30 },
  { name: "D", threshold: 1 },
  { name: "E", threshold: 0 },
];

export const TASK_CATEGORIES = [
  "Progresión",
  "Crafting",
  "PvP",
  "Items",
  "Special",
  "Bosses",
  "Endgame",
] as const;