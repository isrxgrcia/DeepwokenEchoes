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
    const nextRankData = RANKS[currentRankIndex - 1];
    
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
    <div className="panel animate-abyss-glow">
      <div className="absolute top-0 right-0 p-5 opacity-10">
        <div className="echo-orb w-16 h-16" />
      </div>

      <div className="relative z-10 text-center p-5">
        <div className="text-muted text-[10px] tracking-rune uppercase mb-3">Current Rank</div>
        <div
          className="text-6xl md:text-7xl font-display font-bold mb-4 transition-all duration-500"
          style={{ color: rankColor, textShadow: `0 0 50px ${rankColor}50` }}
        >
          {rank}
        </div>
        
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="text-4xl md:text-5xl font-display font-bold text-foreground gold-glow tabular-nums">
            {total}
          </div>
          <div className="text-muted text-[10px] tracking-rune uppercase">Total Wind</div>
        </div>

        {nextRank && (
          <div className="w-full space-y-3">
            <div className="flex justify-between text-[10px] uppercase tracking-rune text-muted">
              <span>Progress to {nextRank}</span>
              <span className="font-mono tabular-nums">{Math.floor(progress)}%</span>
            </div>
            <div className="stat-bar">
              <span 
                className="block h-full rounded-sm"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(135deg, oklch(0.80 0.14 80), oklch(0.65 0.12 70))',
                  boxShadow: '0 0 10px oklch(0.80 0.14 80 / 0.5)'
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pb-5 space-y-4">
        <div className="pt-4 border-t" style={{ borderColor: 'oklch(0.78 0.13 78 / 0.22)' }}>
          <div className="flex justify-between items-center">
            <span className="text-muted text-[11px] tracking-rune uppercase">Base Echoes</span>
            <span className="text-foreground font-mono text-sm tabular-nums">{basePoints}</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-muted text-[11px] tracking-rune uppercase">Depth Surge</span>
            <span className="text-accent font-mono text-sm tabular-nums font-semibold">
              +{Math.round(modifierSum * 100)}%
            </span>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3" style={{ borderTop: '1px solid oklch(0.78 0.13 78 / 0.22)' }}>
            <span className="text-muted text-[11px] tracking-rune uppercase">Active Tides</span>
            <span className="text-accent font-mono text-sm tabular-nums">{character.activeModifiers.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
