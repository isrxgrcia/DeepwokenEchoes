import { useState } from "react";
import { useCharacterDatabase } from "./hooks/useCharacter";
import { CharacterBuilder } from "./components/CharacterBuilder";
import { CharacterSelector } from "./components/CharacterSelector";
import { TaskChecker } from "./components/TaskChecker";
import { ModifierToggle } from "./components/ModifierToggle";
import { WindDisplay } from "./components/WindDisplay";

type View = "list" | "creator" | "tracker";

function App() {
  const {
    database,
    activeCharacter,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    setActiveCharacter,
    resetActiveCharacter,
    canAddMore,
  } = useCharacterDatabase();

  const [view, setView] = useState<View>("list");

  const handleSelectCharacter = (id: string) => {
    setActiveCharacter(id);
    const char = database.characters.find(c => c.id === id);
    if (char?.race && char?.weapon) {
      setView("tracker");
    } else {
      setView("creator");
    }
  };

  const navigateTo = (newView: View) => {
    setView(newView);
  };

  if (!activeCharacter) {
    return (
      <div className="min-h-screen bg-abyss_dark relative overflow-hidden">
        <div className="abyss-bg" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-12">
              <div className="inline-block mb-6 relative">
                <svg className="w-20 h-20 mx-auto text-cyan_wind cyan-depth-glow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
                </svg>
                <div className="absolute inset-0 bg-cyan_wind/10 blur-xl rounded-full" />
              </div>
              <h1 className="text-6xl font-serif font-bold text-cyan_wind tracking-[0.4em] cyan-depth-glow">DEEPWOKEN</h1>
              <p className="text-text_dim mt-4 tracking-[0.5em] text-sm uppercase font-light">Wind Tracker</p>
            </div>
            
            <CharacterSelector
              database={database}
              activeCharacter={null}
              onSelect={handleSelectCharacter}
              onDelete={deleteCharacter}
              onAddNew={addCharacter}
              canAddMore={canAddMore}
            />
          </div>
        </div>
      </div>
    );
  }

  if (view === "creator") {
    return (
      <div className="min-h-screen bg-abyss_dark relative overflow-hidden">
        <div className="abyss-bg" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-text_main">{activeCharacter.name}</h1>
              <p className="text-text_dim mt-2 tracking-widest text-xs uppercase font-light">Character Creation</p>
            </div>
            
            <div className="abyss-card rounded-lg p-8">
              <CharacterBuilder
                character={activeCharacter}
                onUpdate={(updates) => updateCharacter(activeCharacter.id, updates)}
              />
              
              <button
                onClick={() => navigateTo("tracker")}
                className="abyss-btn w-full mt-8 py-4 rounded text-sm"
              >
                Continue
              </button>
            </div>

            {database.characters.length > 1 && (
              <button
                onClick={() => {
                  resetActiveCharacter();
                  navigateTo("list");
                }}
                className="abyss-btn-secondary w-full mt-4 py-3 rounded text-xs tracking-widest"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss_dark relative overflow-hidden">
      <div className="abyss-bg" />
      <div className="relative z-10">
        <header className="bg-abyss/50 backdrop-blur-sm border-b border-border/30 py-5 px-5">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-cyan_wind" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
              </svg>
              <div>
                <h1 className="text-xl font-serif font-bold text-cyan_wind tracking-wider">Deepwoken</h1>
                <p className="text-text_dim text-xs tracking-[0.2em] font-light">
                  {activeCharacter.name} • {activeCharacter.race} • {activeCharacter.weapon}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo("creator")}
              className="abyss-btn-secondary px-4 py-2 rounded text-xs tracking-widest"
            >
              Edit
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
                onSelect={handleSelectCharacter}
                onDelete={deleteCharacter}
                onAddNew={addCharacter}
                canAddMore={canAddMore}
              />
            </aside>

            <div className="lg:col-span-3 space-y-8">
              <section>
                <h2 className="text-xl font-serif font-semibold text-text_main mb-4 tracking-wide">
                  Echoes
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
    </div>
  );
}

export default App;