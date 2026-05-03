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
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-serif text-text_main tracking-widest uppercase text-sm">Depth Modifiers</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
        <p className="text-[10px] text-text_dim tracking-[0.2em] uppercase font-medium">Channel the depths' power to surge your wind</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODIFIERS.map((mod, index) => {
          const isActive = character.activeModifiers.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => toggleModifier(mod.id)}
              className={`abyss-card group rounded-xl px-6 py-5 transition-all duration-300 text-left relative overflow-hidden ${
                isActive 
                  ? "modifier-active border-cyan_wind/40 ring-1 ring-cyan_wind/20" 
                  : "hover:bg-white/5 border-white/5"
              }`}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {isActive && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan_wind to-transparent opacity-50"></div>
              )}
              
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? "bg-cyan_wind/20 text-cyan_wind" : "bg-white/5 text-text_dim group-hover:text-text_main"
                  }`}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <span className={`font-mono text-xs font-bold transition-all ${
                    isActive ? "text-cyan_wind" : "text-text_dim"
                  }`}>
                    +{Math.round(mod.multiplier * 100)}%
                  </span>
                </div>
                
                <div>
                  <div className={`font-serif text-sm tracking-widest transition-colors ${isActive ? "text-cyan_wind" : "text-text_main"}`}>
                    {mod.name}
                  </div>
                  <div className="text-[10px] text-text_dim mt-1 line-clamp-1 font-medium">Surge multiplier</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}