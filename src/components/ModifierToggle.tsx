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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text_main">Modificadores</h3>
      <p className="text-sm text-text_dim">Activa los modificadores que apliquen a tu personaje</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {MODIFIERS.map((mod) => {
          const isActive = character.activeModifiers.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => toggleModifier(mod.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-gold/20 border border-gold text-gold"
                  : "bg-bg_card border border-border text-text_main hover:bg-bg_hover"
              }`}
            >
              <span className="font-medium">{mod.name}</span>
              <span className={`font-mono ${isActive ? "text-gold_bright" : "text-text_dim"}`}>
                +{Math.round(mod.multiplier * 100)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}