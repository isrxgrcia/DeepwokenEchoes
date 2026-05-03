import { MODIFIERS } from "../constants";
import type { Character } from "../types";

interface ModifierToggleProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
}

export function ModifierToggle({ character, onUpdate }: ModifierToggleProps) {
  const toggleModifier = (modId: string) => {
    const newMods = character.activeModifiers.includes(modId)
      ? character.activeModifiers.filter((id) => id !== modId)
      : [...character.activeModifiers, modId];
    onUpdate({ activeModifiers: newMods });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-serif text-text_main tracking-wide">Depth Modifiers</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>
      <p className="text-xs text-text_dim tracking-wide">Channel the depths' power</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MODIFIERS.map((mod, index) => {
          const isActive = character.activeModifiers.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => toggleModifier(mod.id)}
              className={`abyss-card rounded-lg px-5 py-4 transition-all hover:border-cyan_wind/30 text-left ${
                isActive 
                  ? "modifier-active" 
                  : ""
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className={`font-serif text-sm tracking-wide ${isActive ? "text-cyan_wind" : "text-text_main"}`}>
                  {mod.name}
                </span>
                <span className={`font-mono text-sm tracking-wider transition-all ${
                  isActive ? "text-cyan_wind" : "text-text_dim"
                }`}>
                  +{Math.round(mod.multiplier * 100)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}