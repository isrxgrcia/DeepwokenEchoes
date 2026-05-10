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
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'oklch(0.11 0.03 225)' }}>
        <div className="abyss-bg" />
        <div className="relative z-10 text-center">
          <div className="echo-orb mx-auto mb-6 animate-glow" />
          <div className="text-accent text-xs tracking-rune uppercase animate-pulse">
            Piercing the veil...
          </div>
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
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'oklch(0.11 0.03 225)' }}>
        <div className="abyss-bg" />
        <div className="relative z-10 text-center">
          <div className="echo-orb mx-auto mb-6 animate-glow" />
          <div className="text-accent text-xs tracking-rune uppercase animate-pulse">
            Cargando tus personajes...
          </div>
        </div>
      </div>
    );
  }

  if (!activeCharacter) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ backgroundColor: 'oklch(0.11 0.03 225)' }}>
        <div className="abyss-bg" />
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={signOut}
            className="grimoire-btn-secondary px-5 py-2.5 text-[10px] tracking-rune uppercase font-semibold group flex items-center gap-2"
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
                <div className="echo-orb mx-auto w-20 h-20 animate-glow" />
                <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-1000" />
              </div>
              <div className="space-y-2">
                <h1 className="font-display text-5xl md:text-6xl font-bold text-gold tracking-[0.3em] gold-glow uppercase">
                  DEEPWOKEN
                </h1>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
                  <p className="text-muted tracking-[0.4em] text-[10px] uppercase font-medium">Las Depths te recuerdan</p>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
                </div>
              </div>
            </div>
            
            <div className="panel p-8">
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
          <p className="heading-rune opacity-40">— Que las depths escojan tu camino —</p>
        </footer>
      </div>
    );
  }

  if (view === "creator") {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ backgroundColor: 'oklch(0.11 0.03 225)' }}>
        <div className="abyss-bg" />
        <header className="relative z-10 border-b border-rune backdrop-blur-md py-4 px-6 md:px-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => { resetActiveCharacter(); navigateTo("list"); }}>
              <div className="echo-orb w-10 h-10" />
              <div>
                <h2 className="font-display text-lg font-bold text-foreground tracking-[0.2em] uppercase">{activeCharacter.name}</h2>
                <p className="text-accent text-[10px] tracking-rune uppercase font-medium">Sculpting the vessel</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="grimoire-btn-secondary px-4 py-2 text-[10px] tracking-rune uppercase font-semibold"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-2xl">
            <div className="panel p-6 md:p-10">
              <CharacterBuilder
                character={activeCharacter}
                onUpdate={(updates) => updateCharacter(activeCharacter.id, updates)}
              />
              
              <div className="mt-10 pt-8 border-t border-rune flex flex-col gap-4">
                <button
                  onClick={() => navigateTo("tracker")}
                  className="grimoire-btn w-full py-4 text-xs font-semibold shadow-lg"
                  style={{ boxShadow: '0 0 20px oklch(0.80 0.14 80 / 0.15)' }}
                >
                  Confirm Incarnation
                </button>
                
                <button
                  onClick={() => {
                    resetActiveCharacter();
                    navigateTo("list");
                  }}
                  className="text-muted hover:text-gold text-[10px] tracking-rune uppercase font-semibold transition-colors py-2"
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
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ backgroundColor: 'oklch(0.11 0.03 225)' }}>
      <div className="abyss-bg" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header 
          className={`backdrop-blur-xl fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'py-2' : 'py-3'
          }`}
          style={{ backgroundColor: 'oklch(0.11 0.03 225 / 0.9)', borderBottom: '1px solid oklch(0.78 0.13 78 / 0.22)' }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center gap-4">
            <div 
              className="flex items-center gap-3 group cursor-pointer min-w-0" 
              onClick={() => { resetActiveCharacter(); navigateTo("list"); }}
            >
              <div className="echo-orb w-8 h-8 md:w-10 md:h-10 shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 md:gap-3">
                  <h1 
                    className={`font-display font-bold text-foreground tracking-[0.2em] uppercase transition-all truncate ${
                      scrolled ? 'text-xs md:text-sm' : 'text-sm md:text-base'
                    }`}
                  >
                    {activeCharacter.name}
                  </h1>
                  {activeCharacter.buildUrl && (
                    <a
                      href={activeCharacter.buildUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors shrink-0"
                      title="View Build Archive"
                    >
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <div className="hidden md:block px-2 py-0.5 rounded text-[9px] text-accent tracking-rune uppercase font-medium shrink-0 border" style={{ backgroundColor: 'oklch(0.55 0.13 215 / 0.1)', borderColor: 'oklch(0.55 0.13 215 / 0.3)' }}>
                    Active
                  </div>
                </div>
                <p className="text-muted text-[8px] md:text-[9px] tracking-[0.15em] font-medium uppercase mt-0.5 truncate">
                  {activeCharacter.race || 'Sin raza'} <span className="opacity-30 mx-1">•</span> {activeCharacter.weapon || 'Sin arma'}
                </p>
              </div>
            </div>
            
            <nav className="flex items-center gap-3 md:gap-4 shrink-0">
              <div className="max-w-[130px] md:max-w-[180px]">
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
                  className="grimoire-input grimoire-select w-full py-2 px-3 rounded text-[9px] tracking-[0.1em] uppercase"
                >
                  {database.characters.map((char) => (
                    <option key={char.id} value={char.id} style={{ backgroundColor: 'oklch(0.11 0.03 225)' }}>
                      {char.name || 'Sin nombre'}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={signOut}
                className="grimoire-btn-secondary px-4 py-2 text-[10px] tracking-rune uppercase font-medium hover:text-gold transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto w-full px-4 md:px-6 pt-20 md:pt-24 pb-10 flex-1">
          <DashboardView
            character={activeCharacter}
            onUpdate={handleCharacterUpdate}
          />
        </main>
        <footer className="py-10 border-t border-rune text-center mt-auto">
          <div className="max-w-2xl mx-auto px-6">
            <div className="echo-orb w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="heading-rune opacity-50 mb-2">— THE DEPTHS REMEMBER —</p>
            <p className="text-muted text-[9px] tracking-[0.2em] uppercase font-medium opacity-30">
              Deepwoken Wind Tracker © 2026
            </p>
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
