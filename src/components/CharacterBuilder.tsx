import { RACES, WEAPON_TYPES, ATTUNEMENTS } from "../constants";
import type { Character } from "../types";
import { useState } from "react";

interface CharacterBuilderProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
  compact?: boolean;
}

export function CharacterBuilder({ character, onUpdate, compact = false }: CharacterBuilderProps) {
  const [importing, setImporting] = useState(false);

  const updateField = <K extends keyof Character>(field: K, value: Character[K]) => {
    onUpdate({ [field]: value });
  };

  const handleImport = async () => {
    if (!character.buildUrl) return;
    setImporting(true);
    
    try {
      setTimeout(() => {
        const lowerUrl = character.buildUrl?.toLowerCase() || "";
        const updates: Partial<Character> = {};
        
        RACES.forEach(r => {
          if (lowerUrl.includes(r.split(" ")[0].toLowerCase())) {
            updates.race = r;
          }
        });
        
        WEAPON_TYPES.forEach(w => {
          if (lowerUrl.includes(w.toLowerCase())) {
            updates.weapon = w;
          }
        });
        
        ATTUNEMENTS.forEach(a => {
          if (lowerUrl.includes(a.toLowerCase())) {
            const current = updates.attunements || character.attunements;
            if (!current.includes(a)) {
              updates.attunements = [...current, a];
            }
          }
        });

        if (Object.keys(updates).length > 0) {
          onUpdate(updates);
        }
        
        setImporting(false);
      }, 1000);
    } catch {
      setImporting(false);
    }
  };

  const inputClasses = "grimoire-input grimoire-select w-full rounded px-4 py-3 text-sm";
  const labelClasses = "block text-muted text-[10px] tracking-rune uppercase font-bold mb-2";

  if (compact) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className={labelClasses}>Build Archive (URL)</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={character.buildUrl || ""}
              onChange={(e) => updateField("buildUrl", e.target.value)}
              placeholder="https://deepwoken.co/builder..."
              className={inputClasses}
            />
            <button
              onClick={handleImport}
              disabled={importing || !character.buildUrl}
              className="grimoire-btn px-4 py-2 text-[10px] disabled:opacity-30 shrink-0"
            >
              {importing ? "..." : "Import"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Lineage</label>
            <select
              value={character.race}
              onChange={(e) => updateField("race", e.target.value)}
              className={`${inputClasses} py-3`}
            >
              <option value="">Choose...</option>
              {RACES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={labelClasses}>Armament</label>
            <select
              value={character.weapon}
              onChange={(e) => updateField("weapon", e.target.value)}
              className={`${inputClasses} py-3`}
            >
              <option value="">Choose...</option>
              {WEAPON_TYPES.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            Attunements
          </label>
          <div className="flex flex-wrap gap-2">
            {ATTUNEMENTS.map((att) => (
              <button
                key={att}
                onClick={() => {
                  const current = character.attunements;
                  if (current.includes(att)) {
                    updateField("attunements", current.filter((a) => a !== att));
                  } else {
                    updateField("attunements", [...current, att]);
                  }
                }}
                className={`px-3 py-2 rounded text-[10px] tracking-rune uppercase font-bold transition-all border ${
                  character.attunements.includes(att)
                    ? "bg-accent/10 border-accent text-accent"
                    : "border-rune text-muted hover:border-[oklch(0.78_0.13_78/0.4)] hover:text-foreground"
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
        <label className={labelClasses}>Build Archive (URL)</label>
        <div className="flex gap-3">
          <input
            type="url"
            value={character.buildUrl || ""}
            onChange={(e) => updateField("buildUrl", e.target.value)}
            placeholder="https://deepwoken.co/builder/..."
            className={inputClasses}
          />
          <button
            onClick={handleImport}
            disabled={importing || !character.buildUrl}
            className="grimoire-btn px-6 py-3 text-xs disabled:opacity-30 shrink-0"
          >
            {importing ? "Reading..." : "Import"}
          </button>
        </div>
        <p className="text-muted text-[9px] tracking-wide uppercase opacity-60">Link your soul to the builder archives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className={labelClasses}>Lineage</label>
          <select
            value={character.race}
            onChange={(e) => updateField("race", e.target.value)}
            className={`${inputClasses} py-4`}
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
          <label className={labelClasses}>Armament</label>
          <select
            value={character.weapon}
            onChange={(e) => updateField("weapon", e.target.value)}
            className={`${inputClasses} py-4`}
          >
            <option value="">Choose armament...</option>
            {WEAPON_TYPES.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className={labelClasses}>
          Attunements
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ATTUNEMENTS.map((att) => (
            <button
              key={att}
              onClick={() => {
                const current = character.attunements;
                if (current.includes(att)) {
                  updateField("attunements", current.filter((a) => a !== att));
                } else {
                  updateField("attunements", [...current, att]);
                }
              }}
              className={`px-4 py-3 rounded text-[10px] tracking-rune uppercase font-bold transition-all border ${
                character.attunements.includes(att)
                  ? "bg-accent/10 border-accent text-accent"
                  : "border-rune text-muted hover:border-[oklch(0.78_0.13_78/0.4)] hover:text-foreground"
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
