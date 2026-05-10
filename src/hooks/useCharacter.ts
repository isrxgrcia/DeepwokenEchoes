import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import type { Character, CharacterDatabase } from "../types";
import { TASKS, MODIFIERS, RANK_THRESHOLDS } from "../constants";
import type { RankTier } from "../types";

const STORAGE_KEY = "deepwoken_active_character";
const MAX_CHARACTERS = 6;

const createEmptyCharacter = (name: string): Omit<Character, "id" | "createdAt"> => ({
  name: name.trim(),
  race: "",
  weapon: "",
  buildUrl: "",
  attunements: [],
  completedTasks: [],
  activeModifiers: [],
  lastView: "inicio",
});

export function useCharacterDatabase() {
  const { user } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCharacterId, setActiveCharacterIdLocal] = useState<string | null>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      setCharacters([]);
      setActiveCharacterIdLocal(null);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
      setLoading(false);
      return;
    }

    setLoading(true);
    supabase
      .from("characters")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching characters:", error);
          setCharacters([]);
        } else {
          setCharacters(
            (data ?? []).map((row) => ({
              id: row.id,
              name: row.name,
              race: row.race,
              weapon: row.weapon,
              buildUrl: row.build_url ?? "",
              attunements: row.attunements ?? [],
              completedTasks: row.completed_tasks ?? [],
              activeModifiers: row.active_modifiers ?? [],
              lastView: row.last_view ?? "inicio",
              createdAt: new Date(row.created_at).getTime(),
            }))
          );
        }
        setLoading(false);
      });
  }, [user]);

  const saveActiveId = useCallback((id: string | null) => {
    setActiveCharacterIdLocal(id);
    if (id) {
      window.localStorage.setItem(STORAGE_KEY, id);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const activeCharacter = characters.find((c) => c.id === activeCharacterId) ?? null;

  const addCharacter = async (name: string): Promise<boolean> => {
    if (!user) return false;
    if (characters.length >= MAX_CHARACTERS) return false;
    if (!name.trim()) return false;

    const emptyChar = createEmptyCharacter(name);

    const { data, error } = await supabase
      .from("characters")
      .insert({
        user_id: user.id,
        name: emptyChar.name,
        race: emptyChar.race,
        weapon: emptyChar.weapon,
        build_url: emptyChar.buildUrl,
        attunements: emptyChar.attunements,
        completed_tasks: emptyChar.completedTasks,
        active_modifiers: emptyChar.activeModifiers,
        last_view: emptyChar.lastView,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating character:", error);
      return false;
    }

    if (data) {
      const newCharacter: Character = {
        id: data.id,
        name: data.name,
        race: data.race,
        weapon: data.weapon,
        buildUrl: data.build_url,
        attunements: data.attunements ?? [],
        completedTasks: data.completed_tasks ?? [],
        activeModifiers: data.active_modifiers ?? [],
        lastView: data.last_view ?? "inicio",
        createdAt: new Date(data.created_at).getTime(),
      };
      setCharacters((prev) => [...prev, newCharacter]);
      saveActiveId(newCharacter.id);
    }

    return true;
  };

  const updateCharacter = async (id: string, updates: Partial<Character>) => {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.race !== undefined) dbUpdates.race = updates.race;
    if (updates.weapon !== undefined) dbUpdates.weapon = updates.weapon;
    if (updates.buildUrl !== undefined) dbUpdates.build_url = updates.buildUrl;
    if (updates.attunements !== undefined) dbUpdates.attunements = updates.attunements;
    if (updates.completedTasks !== undefined) dbUpdates.completed_tasks = updates.completedTasks;
    if (updates.activeModifiers !== undefined) dbUpdates.active_modifiers = updates.activeModifiers;
    if (updates.lastView !== undefined) dbUpdates.last_view = updates.lastView;

    const { error } = await supabase
      .from("characters")
      .update(dbUpdates)
      .eq("id", id);

    if (error) {
      console.error("Error updating character:", error);
      return;
    }

    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCharacter = async (id: string) => {
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting character:", error);
      return;
    }

    const remaining = characters.filter((c) => c.id !== id);
    setCharacters(remaining);

    if (activeCharacterId === id) {
      saveActiveId(remaining[0]?.id ?? null);
    }
  };

  const setActiveCharacter = (id: string) => {
    if (!characters.find((c) => c.id === id)) return;
    saveActiveId(id);
  };

  const resetActiveCharacter = () => {
    saveActiveId(null);
  };

  return {
    database: { activeCharacterId, characters } as CharacterDatabase,
    activeCharacter,
    loading,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    setActiveCharacter,
    resetActiveCharacter,
    canAddMore: characters.length < MAX_CHARACTERS,
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