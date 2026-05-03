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
    <div className="abyss-card abyss-wind-display rounded-lg p-6">
      <div className="text-center">
        <div className="text-text_dim text-xs tracking-[0.3em] uppercase mb-4 font-light">Depth Rank</div>
        <div
          className="text-7xl font-serif font-bold mb-2"
          style={{ color: rankColor, textShadow: `0 0 30px ${rankColor}50` }}
        >
          {rank}
        </div>
        <div className="text-text_dim text-xs tracking-[0.2em] uppercase mb-6 font-light">Total Wind</div>
        <div
          className="text-5xl font-bold cyan-depth-glow"
        >
          {total}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-text_dim text-xs tracking-wider uppercase font-light">Base Echoes</span>
          <span className="text-text_main font-mono">{basePoints}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text_dim text-xs tracking-wider uppercase font-light">Depth Surge</span>
          <span className="text-cyan_wind font-mono">
            +{Math.round(modifierSum * 100)}%
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-border/30">
          <span className="text-text_dim text-xs tracking-wider uppercase font-light">Active Tides</span>
          <span className="text-cyan_wind font-mono">{character.activeModifiers.length}</span>
        </div>
      </div>
    </div>
  );
}