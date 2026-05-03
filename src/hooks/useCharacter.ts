import { useState, useCallback } from "react";
import type { Character, CharacterDatabase } from "../types";
import { TASKS, MODIFIERS, RANK_THRESHOLDS } from "../constants";
import type { RankTier } from "../types";

const STORAGE_KEY = "deepwoken_characters";
const MAX_CHARACTERS = 6;

const createEmptyCharacter = (name: string): Character => ({
  id: crypto.randomUUID(),
  name,
  race: "",
  weapon: "",
  attunements: [],
  completedTasks: [],
  activeModifiers: [],
  createdAt: Date.now(),
});

const defaultDatabase: CharacterDatabase = {
  activeCharacterId: null,
  characters: [],
};

export function useCharacterDatabase() {
  const [db, setDb] = useState<CharacterDatabase>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : defaultDatabase;
    } catch {
      return defaultDatabase;
    }
  });

  const saveDb = useCallback((newDb: CharacterDatabase) => {
    setDb(newDb);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newDb));
  }, []);

  const activeCharacter = db.characters.find((c) => c.id === db.activeCharacterId) ?? null;

  const addCharacter = (name: string) => {
    if (db.characters.length >= MAX_CHARACTERS) return false;
    if (!name.trim()) return false;
    
    const newChar = createEmptyCharacter(name.trim());
    const newDb = {
      activeCharacterId: newChar.id,
      characters: [...db.characters, newChar],
    };
    saveDb(newDb);
    return true;
  };

  const updateCharacter = (id: string, updates: Partial<Character>) => {
    const newDb = {
      ...db,
      characters: db.characters.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    };
    saveDb(newDb);
  };

  const deleteCharacter = (id: string) => {
    const newCharacters = db.characters.filter((c) => c.id !== id);
    let newActiveId = db.activeCharacterId;
    
    if (db.activeCharacterId === id) {
      newActiveId = newCharacters[0]?.id ?? null;
    }
    
    const newDb = {
      activeCharacterId: newActiveId,
      characters: newCharacters,
    };
    saveDb(newDb);
  };

  const setActiveCharacter = (id: string) => {
    if (!db.characters.find((c) => c.id === id)) return;
    saveDb({ ...db, activeCharacterId: id });
  };

  const resetActiveCharacter = () => {
    saveDb({ ...db, activeCharacterId: null });
  };

  return {
    database: db,
    activeCharacter,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    setActiveCharacter,
    resetActiveCharacter,
    canAddMore: db.characters.length < MAX_CHARACTERS,
  };
}

export function calculateWind(character: Character): number {
  const { completedTasks, activeModifiers } = character;

  const basePoints = completedTasks.reduce((sum, taskId) => {
    const task = TASKS.find((t) => t.id === taskId);
    return sum + (task?.value ?? 0);
  }, 0);

  const modifierSum = activeModifiers.reduce((sum, modId) => {
    const mod = MODIFIERS.find((m) => m.id === modId);
    return sum + (mod?.multiplier ?? 0);
  }, 0);

  return Math.floor(basePoints * (1.0 + modifierSum));
}

export function getRank(total: number): RankTier {
  if (total >= RANK_THRESHOLDS.W) return "W";
  if (total >= RANK_THRESHOLDS.S) return "S";
  if (total >= RANK_THRESHOLDS.A) return "A";
  if (total >= RANK_THRESHOLDS.B) return "B";
  if (total >= RANK_THRESHOLDS.C) return "C";
  if (total >= RANK_THRESHOLDS.D) return "D";
  return "E";
}