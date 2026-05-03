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
            <label className="block text-text_dim text-xs mb-1">Raza</label>
            <select
              value={character.race}
              onChange={(e) => updateField("race", e.target.value)}
              className="w-full bg-bg_card border border-border rounded px-2 py-2 text-sm text-text_main focus:outline-none focus:border-gold"
            >
              <option value="">Raza...</option>
              {RACES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-text_dim text-xs mb-1">Arma</label>
            <select
              value={character.weapon}
              onChange={(e) => updateField("weapon", e.target.value)}
              className="w-full bg-bg_card border border-border rounded px-2 py-2 text-sm text-text_main focus:outline-none focus:border-gold"
            >
              <option value="">Arma...</option>
              {WEAPON_TYPES.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-text_dim text-xs mb-1">Attunements</label>
          <div className="flex flex-wrap gap-1">
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
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  character.attunements.includes(att)
                    ? "bg-cyan_wind text-bg_darker font-semibold"
                    : "bg-bg_card border border-border text-text_main hover:bg-bg_hover"
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
    <div className="space-y-6">
      <div>
        <label className="block text-text_dim text-sm mb-2">Raza</label>
        <select
          value={character.race}
          onChange={(e) => updateField("race", e.target.value)}
          className="w-full bg-bg_card border border-border rounded-lg px-4 py-3 text-text_main focus:outline-none focus:border-gold"
        >
          <option value="">Seleccionar raza...</option>
          {RACES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-text_dim text-sm mb-2">Arma</label>
        <select
          value={character.weapon}
          onChange={(e) => updateField("weapon", e.target.value)}
          className="w-full bg-bg_card border border-border rounded-lg px-4 py-3 text-text_main focus:outline-none focus:border-gold"
        >
          <option value="">Seleccionar arma...</option>
          {WEAPON_TYPES.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-text_dim text-sm mb-2">Attunements (selecciona hasta 2)</label>
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
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                character.attunements.includes(att)
                  ? "bg-cyan_wind text-bg_darker font-semibold"
                  : "bg-bg_card border border-border text-text_main hover:bg-bg_hover"
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