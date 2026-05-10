import { useState, useMemo } from 'react';
import type { Character } from '../types';
import { WindDisplay } from './WindDisplay';
import { TaskChecker } from './TaskChecker';
import { ModifierToggle } from './ModifierToggle';
import { CharacterBuilder } from './CharacterBuilder';
import { SectionHeader } from './Panel';

import { calculateWind, getRank } from '../hooks/useCharacter';
import { RANK_COLORS } from '../constants';

type DashboardSubView = 'inicio' | 'overview' | 'build';

interface DashboardViewProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
  navigateToCreator: () => void;
}

export function DashboardView({
  character,
  onUpdate,
  navigateToCreator,
}: DashboardViewProps) {
  const [subView, setSubView] = useState<DashboardSubView>('inicio');

  const windTotal = useMemo(() => calculateWind(character), [character]);
  const rank = useMemo(() => getRank(windTotal), [windTotal]);
  const rankColor = RANK_COLORS[rank];

  const navItemClasses = (current: DashboardSubView) => `
    px-4 md:px-6 py-2 rounded text-[10px] md:text-xs font-display tracking-rune uppercase transition-all
    ${subView === current 
      ? 'border border-rune text-gold' 
      : 'text-muted hover:text-foreground hover:border border-transparent'
    }
  `;

  return (
    <div className="flex flex-col min-h-full">
      <nav className="mb-6 md:mb-8 border-b border-rune pb-4 overflow-x-auto">
        <div className="flex gap-2 md:gap-3 justify-center">
          <button onClick={() => setSubView('inicio')} className={navItemClasses('inicio')}>
            Inicio
          </button>
          <button onClick={() => setSubView('overview')} className={navItemClasses('overview')}>
            Echoes
          </button>
          <button onClick={() => setSubView('build')} className={navItemClasses('build')}>
            Build
          </button>
        </div>
      </nav>

      <div className="flex-1">
        {subView === 'inicio' && (
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            <div className="panel text-center">
              <div className="space-y-3">
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-[0.2em] uppercase">
                  {character.name || 'Sin nombre'}
                </h2>
                <div 
                  className="text-5xl md:text-7xl font-display font-bold"
                  style={{ 
                    color: rankColor, 
                    textShadow: `0 0 40px ${rankColor}40` 
                  }}
                >
                  {rank}
                </div>
                <div className="text-muted text-[10px] tracking-rune uppercase">
                  Rango de Echoes • {windTotal} pts
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="panel">
                <div className="text-muted text-[10px] tracking-rune uppercase mb-2">Lineage</div>
                <div className="text-foreground text-sm md:text-base font-display tracking-wider">
                  {character.race || 'No seleccionado'}
                </div>
              </div>

              <div className="panel">
                <div className="text-muted text-[10px] tracking-rune uppercase mb-2">Armament</div>
                <div className="text-foreground text-sm md:text-base font-display tracking-wider">
                  {character.weapon || 'No seleccionado'}
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="text-muted text-[10px] tracking-rune uppercase mb-3">Attunements</div>
              {character.attunements.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {character.attunements.map((att) => (
                    <span 
                      key={att}
                      className="px-3 py-1.5 rounded text-[10px] tracking-rune uppercase font-medium border"
                      style={{ 
                        backgroundColor: 'oklch(0.55 0.13 215 / 0.1)',
                        borderColor: 'oklch(0.55 0.13 215 / 0.3)',
                        color: 'oklch(0.55 0.13 215)'
                      }}
                    >
                      {att}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-muted text-sm">No seleccionados</div>
              )}
            </div>
          </div>
        )}

        {subView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <aside className="lg:col-span-4 xl:col-span-3 space-y-6 h-fit lg:sticky lg:top-24">
              <WindDisplay character={character} />
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 space-y-8">
              <section className="panel">
                <SectionHeader 
                  title="Progression of Echoes" 
                />
                <TaskChecker
                  character={character}
                  onUpdate={onUpdate}
                />
              </section>

              <section className="panel">
                <SectionHeader 
                  title="Depth Modifiers" 
                />
                <ModifierToggle
                  character={character}
                  onUpdate={onUpdate}
                />
              </section>
            </div>
          </div>
        )}

        {subView === 'build' && (
          <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="panel">
              <SectionHeader 
                title="Vessel Blueprint" 
                subtitle="Review and refine your character's core design"
              />
              <CharacterBuilder
                character={character}
                onUpdate={onUpdate}
              />
              <div className="mt-8 pt-6 border-t border-rune">
                <h3 className="heading-rune mb-4">Build Archive</h3>
                {character.buildUrl ? (
                  <a 
                    href={character.buildUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="grimoire-btn px-6 py-3 text-xs flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View External Build</span>
                    <span className="text-[9px] opacity-50 group-hover:opacity-80 transition-opacity">
                      ({new URL(character.buildUrl).hostname})
                    </span>
                  </a>
                ) : (
                  <button 
                    onClick={navigateToCreator}
                    className="grimoire-btn-secondary px-6 py-3 text-xs w-full"
                  >
                    Add Build URL in Creator
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
