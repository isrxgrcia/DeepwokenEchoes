import { useState } from "react";
import type { Character, CharacterDatabase } from "../types";
import { calculateWind, getRank } from "../hooks/useCharacter";
import { RANK_COLORS } from "../constants";

interface CharacterSelectorProps {
  database: CharacterDatabase;
  activeCharacter: Character | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: (name: string) => boolean | Promise<boolean>;
  canAddMore: boolean;
}

export function CharacterSelector({
  database,
  activeCharacter,
  onSelect,
  onDelete,
  onAddNew,
  canAddMore,
}: CharacterSelectorProps) {
  const [newName, setNewName] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = async () => {
    const result = await onAddNew(newName);
    if (result) {
      setNewName("");
      setShowAdd(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[11px] font-display text-foreground tracking-rune uppercase font-semibold">Personajes destinados a morir</h2>
          <p className="text-muted text-[10px] tracking-wide">Personajes Vivos</p>
        </div>
        {canAddMore && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`w-8 h-8 rounded flex items-center justify-center transition-all duration-300 border ${
              showAdd 
                ? "bg-accent/10 border-accent text-accent" 
                : "border-rune text-muted hover:border-[oklch(0.78_0.13_78/0.4)] hover:text-foreground"
            }`}
            title="Crear nuevo personaje"
          >
            <svg className={`w-4 h-4 transition-transform duration-300 ${showAdd ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {showAdd && (
        <div 
          className="flex flex-col gap-3 p-4 panel animate-unfurl"
          style={{ borderColor: 'oklch(0.55 0.13 215 / 0.3)' }}
        >
          <div className="text-accent text-[10px] tracking-rune uppercase font-bold mb-1">Manifest New Soul</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Name this vessel..."
              maxLength={20}
              className="grimoire-input flex-1 rounded px-4 py-2.5 text-sm"
              autoFocus
            />
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="grimoire-btn px-5 py-2.5 text-[10px] disabled:opacity-20"
            >
              Invoke
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {database.characters.map((char) => {
          const wind = calculateWind(char);
          const rank = getRank(wind);
          const rankColor = RANK_COLORS[rank];
          const isActive = char.id === activeCharacter?.id;

          return (
            <div
              key={char.id}
              onClick={() => onSelect(char.id)}
              className={`panel group cursor-pointer transition-all duration-300 relative ${
                isActive 
                  ? "border border-rune" 
                  : "hover:border-[oklch(0.78_0.13_78/0.3)]"
              }`}
            >
              {isActive && (
                <div 
                  className="absolute top-0 left-0 bottom-0 w-0.5"
                  style={{ 
                    backgroundColor: 'oklch(0.55 0.13 215)',
                    boxShadow: '2px 0 10px oklch(0.55 0.13 215 / 0.3)'
                  }}
                />
              )}
              
              <div className="flex justify-between items-center relative z-10 px-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display text-sm tracking-rune transition-colors ${
                      isActive ? "text-gold" : "text-foreground group-hover:text-gold"
                    }`}>
                      {char.name}
                    </h3>
                    {char.buildUrl && (
                      <a
                        href={char.buildUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted hover:text-accent transition-colors"
                        title="View Build Archive"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {isActive && <div className="echo-orb w-1.5 h-1.5 animate-glow" />}
                  </div>
                  <p className="text-muted text-[10px] mt-1.5 tracking-wide uppercase font-medium">
                    <span className={char.race ? "text-foreground" : ""}>{char.race || "Soulbound"}</span>
                    <span className="opacity-20 mx-2">•</span>
                    <span className={char.weapon ? "text-foreground" : ""}>{char.weapon || "Unarmed"}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-muted text-[9px] tracking-rune uppercase mb-0.5 opacity-50">Rank</div>
                    <div
                      className="text-2xl font-display font-bold transition-all duration-300 group-hover:scale-110"
                      style={{ color: rankColor, textShadow: `0 0 20px ${rankColor}30` }}
                    >
                      {rank}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(char.id);
                    }}
                    className="w-8 h-8 rounded flex items-center justify-center text-muted/30 hover:text-[oklch(0.42_0.18_25)] hover:bg-[oklch(0.42_0.18_25/0.1)] transition-all duration-300 opacity-0 group-hover:opacity-100"
                    title="Exile Vessel"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {database.characters.length === 0 && !showAdd && (
          <div 
            className="flex flex-col items-center justify-center py-12 px-6 panel rounded border-dashed opacity-50"
            style={{ borderColor: 'oklch(0.78 0.13 78 / 0.15)' }}
          >
            <div className="echo-orb w-12 h-12 mb-4 opacity-30" />
            <p className="text-muted text-xs text-center tracking-rune uppercase font-light">
              No vessels recorded in this era
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
