import { RACES, WEAPON_TYPES, ATTUNEMENTS } from "../constants";
import type { Character } from "../types";

interface CharacterBuilderProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
  compact?: boolean;
}

export function CharacterBuilder({ character, onUpdate, compact = false }: CharacterBuilderProps) {
  const updateField = <K extends keyof Character>(field: K, value: Character[K]) => {
    onUpdate({ [field]: value });
  };

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text_dim text-xs mb-2 tracking-wider uppercase">Lineage</label>
            <select
              value={character.race}
              onChange={(e) => updateField("race", e.target.value)}
              className="abyss-input depth-select w-full rounded px-3 py-2.5 text-sm"
            >
              <option value="">Choose...</option>
              {RACES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-text_dim text-xs mb-2 tracking-wider uppercase">Armament</label>
            <select
              value={character.weapon}
              onChange={(e) => updateField("weapon", e.target.value)}
              className="abyss-input depth-select w-full rounded px-3 py-2.5 text-sm"
            >
              <option value="">Choose...</option>
              {WEAPON_TYPES.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-text_dim text-xs mb-2 tracking-wider uppercase">
            Attunements <span className="text-text_dim/50">(max 2)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {ATTUNEMENTS.map((att) => (
              <button
                key={att}
                onClick={() => {
                  const current = character.attunements;
                  if (current.includes(att)) {
                    updateField("attunements", current.filter((a) => a !== att));
                  } else if (current.length < 2) {
                    updateField("attunements", [...current, att]);
                  }
                }}
                className={`px-3 py-1.5 rounded text-xs tracking-wide transition-all ${
                  character.attunements.includes(att)
                    ? "attunement-selected text-cyan_wind"
                    : "abyss-card text-text_main hover:border-cyan_wind/30"
                }`}
              >
                {att}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="block text-text_dim text-sm tracking-[0.2em] uppercase font-light">Lineage</label>
        <select
          value={character.race}
          onChange={(e) => updateField("race", e.target.value)}
          className="abyss-input depth-select w-full rounded-lg px-4 py-3"
        >
          <option value="">Choose lineage...</option>
          {RACES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-text_dim text-sm tracking-[0.2em] uppercase font-light">Armament</label>
        <select
          value={character.weapon}
          onChange={(e) => updateField("weapon", e.target.value)}
          className="abyss-input depth-select w-full rounded-lg px-4 py-3"
        >
          <option value="">Choose armament...</option>
          {WEAPON_TYPES.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-text_dim text-sm tracking-[0.2em] uppercase font-light">
          Attunements <span className="text-text_dim/50">(max 2)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ATTUNEMENTS.map((att) => (
            <button
              key={att}
              onClick={() => {
                const current = character.attunements;
                if (current.includes(att)) {
                  updateField("attunements", current.filter((a) => a !== att));
                } else if (current.length < 2) {
                  updateField("attunements", [...current, att]);
                }
              }}
              className={`px-4 py-3 rounded-lg text-sm tracking-wide transition-all ${
                character.attunements.includes(att)
                  ? "attunement-selected text-cyan_wind"
                  : "abyss-card text-text_main hover:border-cyan_wind/30"
              }`}
            >
              {att}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}