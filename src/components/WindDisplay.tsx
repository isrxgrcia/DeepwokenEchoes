import { useMemo } from "react";
import { getRank } from "../hooks/useCharacter";
import { RANK_COLORS, TASKS, MODIFIERS, RANKS } from "../constants";
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

  const { nextRank, progress } = useMemo(() => {
    const currentRankIndex = RANKS.findIndex(r => r.name === rank);
    const nextRankData = RANKS[currentRankIndex - 1]; // RANKS is usually ordered high to low or vice versa, let's assume high to low based on typical game progression if W is top
    
    // Actually, let's check constants/index.ts to be sure about RANKS order
    // Based on getRank logic: W≥140, S≥112, A≥87, B≥60, C≥30, D≥1, E≥0
    // So RANKS should be [W, S, A, B, C, D, E]
    
    if (!nextRankData) return { nextRank: null, progress: 100 };
    
    const currentThreshold = RANKS[currentRankIndex].threshold;
    const nextThreshold = nextRankData.threshold;
    
    const prog = ((total - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return { 
      nextRank: nextRankData.name, 
      progress: Math.min(Math.max(prog, 0), 100) 
    };
  }, [rank, total]);

  return (
    <div className="abyss-card abyss-wind-display rounded-xl p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg className="w-24 h-24 text-cyan_wind" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <div className="text-text_dim text-[10px] tracking-[0.4em] uppercase mb-1 font-medium">Current Rank</div>
        <div
          className="text-8xl font-serif font-bold mb-4 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-110 cursor-default"
          style={{ color: rankColor, textShadow: `0 0 40px ${rankColor}40` }}
        >
          {rank}
        </div>
        
        <div className="flex flex-col items-center gap-1 mb-8">
          <div className="text-5xl font-bold tracking-tight text-white cyan-depth-glow">
            {total}
          </div>
          <div className="text-text_dim text-[10px] tracking-[0.3em] uppercase font-light">Total Wind</div>
        </div>

        {nextRank && (
          <div className="w-full space-y-2 mb-8">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-text_dim">
              <span>Progress to {nextRank}</span>
              <span className="font-mono">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1.5 w-full bg-abyss_dark/50 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-cyan_wind/40 to-cyan_wind transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-6 border-t border-white/5 space-y-4">
        <div className="flex justify-between items-center group/item">
          <span className="text-text_dim text-[11px] tracking-widest uppercase font-medium group-hover/item:text-text_main transition-colors">Base Echoes</span>
          <span className="text-text_main font-mono text-sm">{basePoints}</span>
        </div>
        <div className="flex justify-between items-center group/item">
          <span className="text-text_dim text-[11px] tracking-widest uppercase font-medium group-hover/item:text-text_main transition-colors">Depth Surge</span>
          <span className="text-cyan_wind font-mono text-sm font-semibold">
            +{Math.round(modifierSum * 100)}%
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-white/5 group/item">
          <span className="text-text_dim text-[11px] tracking-widest uppercase font-medium group-hover/item:text-text_main transition-colors">Active Tides</span>
          <span className="text-cyan_wind font-mono text-sm">{character.activeModifiers.length}</span>
        </div>
      </div>
    </div>
  );
}