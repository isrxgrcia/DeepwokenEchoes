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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {MODIFIERS.map((mod, index) => {
        const isActive = character.activeModifiers.includes(mod.id);
        return (
          <button
            key={mod.id}
            onClick={() => toggleModifier(mod.id)}
            className={`panel group text-left relative transition-all duration-300 ${
              isActive 
                ? "border border-rune shadow-lg" 
                : "hover:border-[oklch(0.78_0.13_78/0.3)]"
            }`}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            {isActive && (
              <div 
                className="absolute top-0 left-0 w-full h-0.5"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, oklch(0.80 0.14 80), transparent)',
                  opacity: 0.5
                }}
              />
            )}
            
            <div className="p-4 flex items-start gap-4">
              <div 
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive 
                    ? "bg-accent/20 text-accent" 
                    : "bg-[oklch(0.11_0.03_225/0.5)] text-muted group-hover:text-foreground"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              
              <div className="flex-1 min-w-0">
                <div 
                  className={`font-display text-sm tracking-rune transition-colors ${
                    isActive ? "text-gold" : "text-foreground"
                  }`}
                >
                  {mod.name}
                </div>
                <div className="text-muted text-[10px] mt-1 font-medium uppercase tracking-wide">
                  Surge +{Math.round(mod.multiplier * 100)}%
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
