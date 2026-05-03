import { useState, useEffect } from "react";
import type { Character } from "./types";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthUI } from "./components/AuthUI";
import { useCharacterDatabase } from "./hooks/useCharacter";
import { CharacterBuilder } from "./components/CharacterBuilder";
import { CharacterSelector } from "./components/CharacterSelector";

import { DashboardView } from "./components/DashboardView";

type View = "list" | "creator" | "tracker";

function MainApp() {
  const { user, signOut, loading: authLoading } = useAuth();
  const {
    database,
    activeCharacter,
    loading: charactersLoading,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    setActiveCharacter,
    resetActiveCharacter,
    canAddMore,
  } = useCharacterDatabase();

  const [view, setView] = useState<View>("list");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-abyss_dark relative overflow-hidden">
        <div className="abyss-bg" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-2 border-cyan_wind/20 border-t-cyan_wind rounded-full animate-spin mb-4"></div>
          <div className="text-cyan_wind text-xs tracking-[0.4em] uppercase font-bold animate-pulse">Piercing the veil...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthUI />;
  }

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

  const handleCharacterUpdate = (updates: Partial<Character>) => {
    if (activeCharacter) {
      updateCharacter(activeCharacter.id, updates);
    }
  };

  if (charactersLoading) {
    return (
      <div className="min-h-screen bg-abyss_dark relative overflow-hidden">
        <div className="abyss-bg" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-2 border-cyan_wind/20 border-t-cyan_wind rounded-full animate-spin mb-4"></div>
          <div className="text-cyan_wind text-xs tracking-[0.4em] uppercase font-bold animate-pulse">Reading the echoes...</div>
        </div>
      </div>
    );
  }
  if (!activeCharacter) {
    return (
      <div className="min-h-screen bg-abyss_dark relative overflow-hidden flex flex-col">
        <div className="abyss-bg" />
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={signOut}
            className="abyss-btn-secondary px-5 py-2.5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold group flex items-center gap-2"
          >
            <span>Log out</span>
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-xl">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block relative group">
                <div className="absolute inset-0 bg-cyan_wind/20 blur-3xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-1000"></div>
                <svg className="w-24 h-24 mx-auto text-cyan_wind cyan-depth-glow relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h1 className="text-7xl font-serif font-bold text-white tracking-[0.5em] drop-shadow-2xl translate-x-[0.25em]">DEEPWOKEN</h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-text_dim/30"></div>
                  <p className="text-text_dim tracking-[0.6em] text-[10px] uppercase font-bold">Echoes of the Abyss</p>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-text_dim/30"></div>
                </div>
              </div>
            </div>
            
            <div className="abyss-card rounded-2xl p-8 border-white/5 bg-black/40 backdrop-blur-xl">
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
        
        <footer className="relative z-10 py-8 text-center">
          <p className="text-[10px] text-text_dim/40 tracking-[0.3em] uppercase font-medium">May the tides guide your path</p>
        </footer>
      </div>
    );
  }

  if (view === "creator") {
    return (
      <div className="min-h-screen bg-abyss_dark relative overflow-hidden flex flex-col">
        <div className="abyss-bg" />
        <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md py-6 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => { resetActiveCharacter(); navigateTo("list"); }}>
              <div className="w-10 h-10 rounded-xl bg-cyan_wind/10 flex items-center justify-center border border-cyan_wind/20 group-hover:border-cyan_wind/40 transition-all">
                <svg className="w-5 h-5 text-cyan_wind" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-white tracking-widest uppercase">{activeCharacter.name}</h2>
                <p className="text-[10px] text-cyan_wind tracking-widest uppercase font-bold">Sculpting the vessel</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="abyss-btn-secondary px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase font-bold"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="relative z-10 flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-3xl">
            <div className="abyss-card rounded-2xl p-10 border-white/5 bg-black/40 backdrop-blur-xl">
              <CharacterBuilder
                character={activeCharacter}
                onUpdate={(updates) => updateCharacter(activeCharacter.id, updates)}
              />
              
              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-4">
                <button
                  onClick={() => navigateTo("tracker")}
                  className="abyss-btn w-full py-5 rounded-xl text-xs font-bold shadow-lg shadow-cyan_wind/10"
                >
                  Confirm Incarnation
                </button>
                
                <button
                  onClick={() => {
                    resetActiveCharacter();
                    navigateTo("list");
                  }}
                  className="text-text_dim hover:text-white text-[10px] tracking-[0.3em] uppercase font-bold transition-colors py-2"
                >
                  ← Return to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss_dark relative overflow-hidden flex flex-col">
      <div className="abyss-bg" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className={`border-b border-white/5 bg-black/40 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center gap-2 md:gap-4">
            <div className="flex items-center gap-3 md:gap-5 group cursor-pointer min-w-0" onClick={() => { resetActiveCharacter(); navigateTo("list"); }}>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-cyan_wind/10 flex items-center justify-center border border-cyan_wind/20 group-hover:border-cyan_wind/40 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)] shrink-0">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan_wind" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 md:gap-3">
                  <h1 className={`font-serif font-bold text-white tracking-widest uppercase transition-all truncate ${scrolled ? 'text-xs md:text-sm' : 'text-sm md:text-xl'}`}>{activeCharacter.name}</h1>
                  {activeCharacter.buildUrl && (
                    <a
                      href={activeCharacter.buildUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text_dim hover:text-cyan_wind transition-colors shrink-0"
                      title="View Build Archive"
                    >
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <div className="hidden md:block px-2 py-0.5 rounded bg-cyan_wind/10 border border-cyan_wind/20 text-[9px] text-cyan_wind tracking-widest font-bold uppercase shrink-0">Active</div>
                </div>
                <p className="text-text_dim text-[8px] md:text-[10px] tracking-[0.2em] font-bold uppercase mt-0.5 truncate">
                  {activeCharacter.race || 'Sin raza'} <span className="text-white/10 mx-1">•</span> {activeCharacter.weapon || 'Sin arma'}
                </p>
              </div>
            </div>
            
            <nav className="flex items-center gap-2 md:gap-4 shrink-0">
              <div className="max-w-[120px] md:max-w-[200px]">
                <select
                  value={activeCharacter.id}
                  onChange={(e) => {
                    const char = database.characters.find(c => c.id === e.target.value);
                    if (char) {
                      setActiveCharacter(char.id);
                      if (char.race && char.weapon) {
                        setView("tracker");
                      } else {
                        setView("creator");
                      }
                    }
                  }}
                  className="abyss-input w-full py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-[8px] md:text-[10px] tracking-widest uppercase bg-black/40 border border-white/10 text-white focus:border-cyan_wind/50"
                >
                  {database.characters.map((char) => (
                    <option key={char.id} value={char.id}>
                      {char.name || 'Sin nombre'}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={signOut}
                className="abyss-btn-secondary px-4 py-2.5 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold hover:text-blood transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-24 md:pt-28 pb-10 flex-1">
          <DashboardView
            character={activeCharacter}
            onUpdate={handleCharacterUpdate}
            navigateToCreator={() => navigateTo("creator")}
          />
        </main>
        <footer className="py-12 border-t border-white/5 text-center mt-auto">
          <div className="max-w-2xl mx-auto px-8">
            <div className="w-12 h-12 mx-auto mb-6 text-white/5">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9 7H3l5 6-2 10 6-8 6 8-2-10 5-6h-6z" />
              </svg>
            </div>
            <p className="text-text_dim text-[10px] tracking-[0.4em] uppercase font-bold mb-2 italic">Non sibi sed aliis</p>
            <p className="text-text_dim/30 text-[9px] tracking-widest uppercase font-medium">Deepwoken Wind Tracker © 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;