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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-serif text-text_main tracking-widest uppercase">My Characters</h2>
        {canAddMore && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="text-cyan_wind hover:text-gold_bright text-xs tracking-widest transition-colors"
          >
            + NEW
          </button>
        )}
      </div>

      {showAdd && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Name this vessel..."
            maxLength={20}
            className="abyss-input flex-1 rounded-lg px-4 py-3 text-sm"
          />
          <button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="abyss-btn px-5 py-3 rounded-lg text-xs tracking-widest disabled:opacity-30"
          >
            SUMMON
          </button>
        </div>
      )}

      <div className="space-y-2">
        {database.characters.map((char) => {
          const wind = calculateWind(char);
          const rank = getRank(wind);
          const rankColor = RANK_COLORS[rank];
          const isActive = char.id === activeCharacter?.id;

          return (
            <div
              key={char.id}
              onClick={() => onSelect(char.id)}
              className={`abyss-card rounded-lg p-4 cursor-pointer transition-all hover:border-cyan_wind/30 ${
                isActive ? "border-cyan_wind/40" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg text-text_main">{char.name}</h3>
                  <p className="text-xs text-text_dim mt-1 tracking-wide">
                    {char.race || "Undrafted"} • {char.weapon || "Unarmed"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: rankColor, textShadow: `0 0 15px ${rankColor}40` }}
                  >
                    {rank}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(char.id);
                    }}
                    className="text-text_dim hover:text-blood text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {database.characters.length === 0 && !showAdd && (
          <p className="text-text_dim text-sm text-center py-6 tracking-widest font-light">
            No vessels in these waters
          </p>
        )}
      </div>
    </div>
  );
}