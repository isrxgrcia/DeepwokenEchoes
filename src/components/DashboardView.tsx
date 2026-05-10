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
}

export function DashboardView({
  character,
  onUpdate,
}: DashboardViewProps) {
  const [subView, setSubView] = useState<DashboardSubView>(character.lastView ?? 'inicio');

  const handleSubViewChange = (view: DashboardSubView) => {
    setSubView(view);
    onUpdate({ lastView: view });
  };

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
          <button onClick={() => handleSubViewChange('inicio')} className={navItemClasses('inicio')}>
            Inicio
          </button>
          <button onClick={() => handleSubViewChange('overview')} className={navItemClasses('overview')}>
            Echoes
          </button>
          <button onClick={() => handleSubViewChange('build')} className={navItemClasses('build')}>
            Build
          </button>
        </div>
      </nav>

      <div className="flex-1">
        {subView === 'inicio' && (
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            <section className="panel">
              <div className="relative z-10 p-6 md:p-8 space-y-6">
                <div className="text-center py-6 space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="echo-orb w-16 h-16 animate-glow" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gold tracking-[0.2em] uppercase">
                    {character.name || 'Sin nombre'}
                  </h2>
                  <div
                    className="text-6xl md:text-8xl font-display font-bold"
                    style={{
                      color: rankColor,
                      textShadow: `0 0 50px ${rankColor}50`
                    }}
                  >
                    {rank}
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-border" />
                    <div className="text-muted text-[10px] tracking-rune uppercase">
                      {windTotal} wind points
                    </div>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-border" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4" style={{ borderTop: '1px solid oklch(0.78 0.13 78 / 0.15)' }}>
                  <div className="p-5 rounded" style={{ backgroundColor: 'oklch(0.16 0.025 220 / 0.3)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 rounded-full bg-accent" />
                      <div className="text-muted text-[10px] tracking-rune uppercase">Lineage</div>
                    </div>
                    <div className="text-foreground text-sm md:text-base font-display tracking-wider">
                      {character.race || '—'}
                    </div>
                  </div>

                  <div className="p-5 rounded" style={{ backgroundColor: 'oklch(0.16 0.025 220 / 0.3)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 rounded-full bg-accent" />
                      <div className="text-muted text-[10px] tracking-rune uppercase">Armament</div>
                    </div>
                    <div className="text-foreground text-sm md:text-base font-display tracking-wider">
                      {character.weapon || '—'}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded" style={{ backgroundColor: 'oklch(0.16 0.025 220 / 0.3)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 rounded-full bg-accent" />
                    <div className="text-muted text-[10px] tracking-rune uppercase">Attunements</div>
                  </div>
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
                    <div className="text-muted text-sm italic">—</div>
                  )}
                </div>
              </div>
            </section>
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
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            <section className="panel">
              <SectionHeader
                title="Vessel Blueprint"
                subtitle="Review and refine your character's core design"
              />
              <div className="p-6 md:p-8 space-y-8">
                <CharacterBuilder
                  character={character}
                  onUpdate={onUpdate}
                />
              </div>
            </section>

            {character.buildUrl && (
              <div className="panel">
                <div className="p-6 md:p-8 text-center">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 rounded-full bg-accent" />
                    <h3 className="heading-rune">Build Archive</h3>
                  </div>
                  <a
                    href={character.buildUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grimoire-btn px-8 py-4 text-sm flex items-center justify-center gap-3 mx-auto w-fit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="tracking-rune uppercase">View on Builder</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
