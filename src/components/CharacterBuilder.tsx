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
    
    // Heuristic parsing for common builders
    // Note: Actual fetching might fail due to CORS, so we try to parse URL first
    try {

      
      // Example: deepwoken.co/builder?id=XYZ
      // Since we can't easily fetch external sites without a proxy,
      // we'll provide a message or try to detect patterns if any.
      
      // For now, let's just simulate a search for keywords in the URL or 
      // just tell the user we're looking for data.
      
      setTimeout(() => {
        // Simple mock behavior: if URL contains certain keywords, try to match them
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
    } catch (e) {
      setImporting(false);
    }
  };

  const inputClasses = "abyss-input w-full rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-cyan_wind/30 outline-none transition-all";
  const labelClasses = "block text-text_dim text-[10px] tracking-[0.3em] uppercase font-bold mb-2";

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
              className="abyss-btn px-4 py-2 rounded-lg text-[10px] tracking-widest disabled:opacity-30 shrink-0"
            >
              {importing ? "..." : "IMPORT"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Lineage</label>
            <select
              value={character.race}
              onChange={(e) => updateField("race", e.target.value)}
              className={`${inputClasses} depth-select`}
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
              className={`${inputClasses} depth-select`}
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
                className={`px-3 py-2 rounded-lg text-[10px] tracking-widest uppercase font-bold transition-all border ${
                  character.attunements.includes(att)
                    ? "bg-cyan_wind/10 border-cyan_wind text-cyan_wind shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                    : "abyss-card border-white/5 text-text_dim hover:border-white/20 hover:text-text_main"
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
            className="abyss-btn px-6 py-3 rounded-lg text-xs tracking-widest disabled:opacity-30 shrink-0"
          >
            {importing ? "READING..." : "IMPORT"}
          </button>
        </div>
        <p className="text-[9px] text-text_dim/60 tracking-wider uppercase">Link your soul to the builder archives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className={labelClasses}>Lineage</label>
          <select
            value={character.race}
            onChange={(e) => updateField("race", e.target.value)}
            className={`${inputClasses} depth-select py-4`}
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
            className={`${inputClasses} depth-select py-4`}
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
              className={`px-4 py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold transition-all border ${
                character.attunements.includes(att)
                  ? "bg-cyan_wind/10 border-cyan_wind/50 text-cyan_wind shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                  : "abyss-card border-white/5 text-text_dim hover:border-white/20 hover:text-text_main"
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