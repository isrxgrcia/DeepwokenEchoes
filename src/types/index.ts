export type RankTier = "W" | "S" | "A" | "B" | "C" | "D" | "E";

export type RaceData = string;

export interface Modifier {
  id: string;
  name: string;
  multiplier: number;
}

export interface Task {
  id: string;
  name: string;
  value: number;
  category: string;
  color?: "blood";
}

export interface Character {
  id: string;
  name: string;
  race: string;
  weapon: string;
  buildUrl?: string;
  attunements: string[];
  completedTasks: string[];
  activeModifiers: string[];
  createdAt: number;
}

export interface CharacterDatabase {
  activeCharacterId: string | null;
  characters: Character[];
}

export type WeaponType = "Heavy" | "Light" | "Medium" | "Puños";

export type Attunement =
  | "Galebreath"
  | "Flamecharm"
  | "Frostdraw"
  | "Thundercall"
  | "Shadowcast"
  | "Ironsing"
  | "Bloodrend";

export interface Rank {
  name: RankTier;
  threshold: number;
}

export type TaskCategory =
  | "Progresión"
  | "Crafting"
  | "PvP"
  | "Items"
  | "Special"
  | "Bosses"
  | "Endgame";

export type DashboardSubView = 'inicio' | 'overview' | 'build' | 'abilities';