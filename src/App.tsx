import { useState, useEffect } from "react";
import { useCharacterDatabase } from "./hooks/useCharacter";
import { CharacterBuilder } from "./components/CharacterBuilder";
import { CharacterSelector } from "./components/CharacterSelector";
import { TaskChecker } from "./components/TaskChecker";
import { ModifierToggle } from "./components/ModifierToggle";
import { WindDisplay } from "./components/WindDisplay";

function App() {
  const {
    database,
    activeCharacter,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    setActiveCharacter,
    canAddMore,
  } = useCharacterDatabase();

  const [view, setView] = useState<"list" | "creator" | "tracker">("list");

  useEffect(() => {
    if (activeCharacter) {
      if (!activeCharacter.race || !activeCharacter.weapon) {
        setView("creator");
      } else if (view === "list") {
        setView("tracker");
      }
    }
  }, [activeCharacter?.id]);

  const navigateTo = (newView: "list" | "creator" | "tracker") => {
    setView(newView);
  };

  if (!activeCharacter) {
    return (
      <div className="min-h-screen bg-bg_darker flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gold">Deepwoken</h1>
            <p className="text-text_dim mt-2">Wind Tracker</p>
          </div>
          
          <CharacterSelector
            database={database}
            activeCharacter={null}
            onSelect={(id) => {
              setActiveCharacter(id);
              setView("tracker");
            }}
            onDelete={deleteCharacter}
            onAddNew={addCharacter}
            canAddMore={canAddMore}
          />
        </div>
      </div>
    );
  }

  if (view === "creator") {
    return (
      <div className="min-h-screen bg-bg_darker flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gold">{activeCharacter.name}</h1>
            <p className="text-text_dim mt-2">Edita tu personaje</p>
          </div>
          
          <div className="bg-bg_card border border-border rounded-lg p-6">
            <CharacterBuilder
              character={activeCharacter}
              onUpdate={(updates) => updateCharacter(activeCharacter.id, updates)}
            />
            
            <button
              onClick={() => navigateTo("tracker")}
              className="w-full mt-6 bg-gold hover:bg-gold/80 text-bg_darker font-semibold py-3 rounded-lg transition-colors"
            >
              Continuar
            </button>
          </div>

          {database.characters.length > 1 && (
            <button
              onClick={() => setView("list")}
              className="w-full mt-4 text-text_dim hover:text-gold py-2"
            >
              ← Cambiar personaje
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg_darker">
      <header className="bg-bg_card border-b border-border py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gold">Deepwoken Wind Tracker</h1>
            <p className="text-text_dim text-sm">
              {activeCharacter.name} • {activeCharacter.race} • {activeCharacter.weapon}
            </p>
          </div>
          <button
            onClick={() => setView("creator")}
            className="text-text_dim hover:text-gold text-sm transition-colors"
          >
            Editar
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <WindDisplay character={activeCharacter} />
            <CharacterSelector
              database={database}
              activeCharacter={activeCharacter}
              onSelect={(id) => {
                setActiveCharacter(id);
                setView("tracker");
              }}
              onDelete={deleteCharacter}
              onAddNew={addCharacter}
              canAddMore={canAddMore}
            />
          </aside>

          <div className="lg:col-span-3 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-text_main mb-4">
                Tareas / Echoes
              </h2>
              <TaskChecker
                character={activeCharacter}
                onUpdate={(updates) => updateCharacter(activeCharacter.id, updates)}
              />
            </section>

            <section>
              <ModifierToggle
                character={activeCharacter}
                onUpdate={(updates) => updateCharacter(activeCharacter.id, updates)}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;