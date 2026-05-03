import { useState } from "react";
import type { Character, CharacterDatabase } from "../types";
import { calculateWind, getRank } from "../hooks/useCharacter";
import { RANK_COLORS } from "../constants";

interface CharacterSelectorProps {
  database: CharacterDatabase;
  activeCharacter: Character | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: (name: string) => boolean;
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

  const handleAdd = () => {
    if (onAddNew(newName)) {
      setNewName("");
      setShowAdd(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-text_main">Mis Personajes</h2>
        {canAddMore && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="text-gold hover:text-gold_bright text-sm"
          >
            + Nuevo
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
            placeholder="Nombre del personaje..."
            maxLength={20}
            className="flex-1 bg-bg_card border border-border rounded-lg px-3 py-2 text-text_main focus:outline-none focus:border-gold"
          />
          <button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="bg-gold hover:bg-gold/80 text-bg_darker font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Crear
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
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? "bg-gold/20 border border-gold"
                  : "bg-bg_card border border-border hover:bg-bg_hover"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text_main">{char.name}</h3>
                  <p className="text-xs text-text_dim">
                    {char.race || "Sin raza"} • {char.weapon || "Sin arma"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-lg font-bold"
                    style={{ color: rankColor }}
                  >
                    {rank}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(char.id);
                    }}
                    className="text-text_dim hover:text-blood text-xs"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {database.characters.length === 0 && !showAdd && (
          <p className="text-text_dim text-sm text-center py-4">
            Crea tu primer personaje
          </p>
        )}
      </div>
    </div>
  );
}