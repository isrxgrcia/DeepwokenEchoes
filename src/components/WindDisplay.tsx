import { useMemo } from "react";
import { getRank } from "../hooks/useCharacter";
import { RANK_COLORS, TASKS, MODIFIERS } from "../constants";
import type { Character } from "../types";

interface WindDisplayProps {
  character: Character;
}

export function WindDisplay({ character }: WindDisplayProps) {
  const { basePoints, modifierSum, total } = useMemo(() => {
    const base = character.completedTasks.reduce((sum, taskId) => {
      const task = TASKS.find((t) => t.id === taskId);
      return sum + (task?.value ?? 0);
    }, 0);

    const mods = character.activeModifiers.reduce((sum, modId) => {
      const mod = MODIFIERS.find((m) => m.id === modId);
      return sum + (mod?.multiplier ?? 0);
    }, 0);

    return {
      basePoints: base,
      modifierSum: mods,
      total: Math.floor(base * (1.0 + mods)),
    };
  }, [character.completedTasks, character.activeModifiers]);

  const rank = getRank(total);
  const rankColor = RANK_COLORS[rank];

  return (
    <div className="bg-bg_card border border-border rounded-lg p-6">
      <div className="text-center">
        <div className="text-text_dim text-sm uppercase tracking-wider mb-2">Wind Rank</div>
        <div
          className="text-6xl font-bold mb-4"
          style={{ color: rankColor, textShadow: `0 0 30px ${rankColor}40` }}
        >
          {rank}
        </div>
        <div className="text-text_dim text-sm mb-6">Total Wind</div>
        <div
          className="text-5xl font-bold"
          style={{ color: "#00E5FF", textShadow: "0 0 20px #00E5FF40" }}
        >
          {total}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text_dim">Base Points</span>
          <span className="text-text_main font-mono">{basePoints}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text_dim">Modifier Bonus</span>
          <span className="text-gold font-mono">
            +{Math.round(modifierSum * 100)}%
          </span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-border">
          <span className="text-text_dim">Active Modifiers</span>
          <span className="text-gold font-mono">{character.activeModifiers.length}</span>
        </div>
      </div>
    </div>
  );
}