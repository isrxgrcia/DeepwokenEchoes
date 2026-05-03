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
      <div className="flex justify-between items-center px-1">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[11px] font-serif text-text_main tracking-[0.3em] uppercase font-bold">The Great Library</h2>
          <p className="text-[10px] text-text_dim tracking-tight">Active Vessels</p>
        </div>
        {canAddMore && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 border ${
              showAdd 
                ? "bg-cyan_wind/10 border-cyan_wind/40 text-cyan_wind" 
                : "bg-white/5 border-white/10 text-text_dim hover:border-white/30 hover:text-text_main"
            }`}
            title="Create New Vessel"
          >
            <svg className={`w-4 h-4 transition-transform duration-300 ${showAdd ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>

      {showAdd && (
        <div className="flex flex-col gap-3 p-4 abyss-card rounded-xl border-cyan_wind/20 shadow-[0_0_15px_rgba(0,229,255,0.05)] depth-fade-in">
          <div className="text-[10px] text-cyan_wind tracking-[0.2em] uppercase font-bold mb-1">Manifest New Soul</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Name this vessel..."
              maxLength={20}
              className="abyss-input flex-1 rounded-lg px-4 py-2.5 text-sm"
              autoFocus
            />
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="abyss-btn px-5 py-2.5 rounded-lg text-[10px] tracking-widest disabled:opacity-20"
            >
              INVOKE
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
              className={`abyss-card group rounded-xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? "bg-white/5 border-cyan_wind/30 shadow-[0_0_20px_rgba(0,229,255,0.05)]" 
                  : "hover:bg-white/5 border-white/5"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan_wind shadow-[2px_0_10px_rgba(0,229,255,0.2)]"></div>
              )}
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-serif text-base tracking-widest transition-colors ${isActive ? "text-cyan_wind" : "text-text_main group-hover:text-white"}`}>
                      {char.name}
                    </h3>
                    {char.buildUrl && (
                      <a
                        href={char.buildUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-text_dim hover:text-cyan_wind transition-colors"
                        title="View Build Archive"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan_wind cyan-depth-glow"></div>}
                  </div>
                  <p className="text-[10px] text-text_dim mt-1.5 tracking-wider uppercase font-medium">
                    <span className={char.race ? "text-text_main" : ""}>{char.race || "Soulbound"}</span>
                    <span className="mx-2 text-white/10">•</span>
                    <span className={char.weapon ? "text-text_main" : ""}>{char.weapon || "Unarmed"}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] text-text_dim tracking-widest uppercase mb-0.5 opacity-50">Rank</div>
                    <div
                      className="text-2xl font-serif font-bold transition-all duration-300 group-hover:scale-110"
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
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-text_dim/30 hover:text-blood hover:bg-blood/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
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
          <div className="flex flex-col items-center justify-center py-12 px-6 abyss-card rounded-xl border-dashed border-white/5 opacity-50">
            <svg className="w-12 h-12 text-white/5 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-text_dim text-xs text-center tracking-[0.2em] uppercase font-light">
              No vessels recorded in this era
            </p>
          </div>
        )}
      </div>
    </div>
  );
}