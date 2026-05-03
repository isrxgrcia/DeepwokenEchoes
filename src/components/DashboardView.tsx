import { useState, useMemo } from 'react';
import type { Character } from '../types';
import { WindDisplay } from './WindDisplay';
import { TaskChecker } from './TaskChecker';
import { ModifierToggle } from './ModifierToggle';
import { CharacterBuilder } from './CharacterBuilder';

import { calculateWind, getRank } from '../hooks/useCharacter';
import { RANK_COLORS } from '../constants';

type DashboardSubView = 'inicio' | 'overview' | 'build' | 'abilities';

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
    px-5 py-2 rounded-lg text-sm font-serif tracking-widest uppercase transition-all
    ${subView === current ? 'bg-cyan_wind/20 text-cyan_wind border border-cyan_wind/40 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'text-text_dim hover:text-white hover:bg-white/5'}
  `;

  return (
    <div className="flex flex-col min-h-full">
      <nav className="mb-8 border-b border-white/5 pb-4">
        <div className="flex gap-4 justify-center">
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
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="abyss-card rounded-2xl p-8 border-white/5 bg-black/20 backdrop-blur-lg">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-serif font-bold text-white tracking-[0.2em]">
                  {character.name || 'Sin nombre'}
                </h2>
                <div 
                  className="text-7xl font-serif font-bold drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  style={{ color: rankColor, textShadow: `0 0 40px ${rankColor}40` }}
                >
                  {rank}
                </div>
                <div className="text-text_dim text-[10px] tracking-[0.3em] uppercase">
                  Rango de Echoes • {windTotal} pts
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="abyss-card rounded-xl p-6 border-white/5 bg-black/20">
                <div className="text-text_dim text-[10px] tracking-[0.3em] uppercase mb-3">Lineage</div>
                <div className="text-white text-lg font-serif tracking-wider">
                  {character.race || 'No seleccionado'}
                </div>
              </div>

              <div className="abyss-card rounded-xl p-6 border-white/5 bg-black/20">
                <div className="text-text_dim text-[10px] tracking-[0.3em] uppercase mb-3">Armament</div>
                <div className="text-white text-lg font-serif tracking-wider">
                  {character.weapon || 'No seleccionado'}
                </div>
              </div>
            </div>

            <div className="abyss-card rounded-xl p-6 border-white/5 bg-black/20">
              <div className="text-text_dim text-[10px] tracking-[0.3em] uppercase mb-4">Attunements</div>
              {character.attunements.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {character.attunements.map((att) => (
                    <span 
                      key={att}
                      className="px-4 py-2 rounded-lg bg-cyan_wind/10 border border-cyan_wind/30 text-cyan_wind text-sm tracking-widest uppercase"
                    >
                      {att}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-text_dim text-sm">No seleccionados</div>
              )}
            </div>
          </div>
        )}

        {subView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4 xl:col-span-3 space-y-8 h-fit lg:sticky lg:top-32">
              <WindDisplay character={character} />
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 space-y-12">
              <section className="space-y-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-serif text-white tracking-[0.3em] uppercase text-sm font-bold">Echoes of Progression</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>
                  <p className="text-[10px] text-text_dim tracking-[0.2em] uppercase font-medium">Record your triumphs across the vast sea</p>
                </div>
                <TaskChecker
                  character={character}
                  onUpdate={onUpdate}
                />
              </section>

              <section className="pt-8 border-t border-white/5">
                <ModifierToggle
                  character={character}
                  onUpdate={onUpdate}
                />
              </section>
            </div>
          </div>
        )}

        {subView === 'build' && (
          <div className="w-full max-w-3xl mx-auto space-y-8">
            <div className="abyss-card rounded-2xl p-8 border-white/5 bg-black/40 backdrop-blur-xl">
                <div className="flex flex-col gap-1 mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-serif text-white tracking-[0.3em] uppercase text-sm font-bold">Vessel Blueprint</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>
                    <p className="text-[10px] text-text_dim tracking-[0.2em] uppercase font-medium">Review and refine your character's core design</p>
                </div>
                <CharacterBuilder
                    character={character}
                    onUpdate={onUpdate}
                />
                <div className="mt-8 pt-6 border-t border-white/5">
                    <h3 className="text-lg font-serif text-white tracking-widest uppercase mb-4 text-sm">Build Archive</h3>
                    {character.buildUrl ? (
                        <a 
                            href={character.buildUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="abyss-btn px-6 py-3 rounded-lg text-xs tracking-widest flex items-center justify-center gap-2 group"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>View External Build</span>
                            <span className="text-[9px] text-white/50 group-hover:text-white/80 transition-colors">({new URL(character.buildUrl).hostname})</span>
                        </a>
                    ) : (
                        <button 
                            onClick={navigateToCreator}
                            className="abyss-btn-secondary px-6 py-3 rounded-lg text-xs tracking-widest w-full"
                        >
                            Add Build URL in Creator
                        </button>
                    )}
                </div>
            </div>
          </div>
        )}

        {subView === 'abilities' && (
          <div className="w-full max-w-3xl mx-auto space-y-8">
            <div className="abyss-card rounded-2xl p-8 border-white/5 bg-black/40 backdrop-blur-xl">
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-serif text-white tracking-[0.3em] uppercase text-sm font-bold">Manifested Talents</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>
                <p className="text-[10px] text-text_dim tracking-[0.2em] uppercase font-medium">Unleash the arcane powers bound to your soul</p>
              </div>
              <p className="text-text_dim text-sm">
                This section will display detailed information about your character's abilities, mantras, and talents.
                It's currently under development, but will provide in-depth analysis of your chosen path.
              </p>
              {/* Future: Add Ability/Mantra display components here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}