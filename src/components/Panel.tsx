import type { ReactNode } from "react";

interface PanelProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function Panel({ title, subtitle, children, className = "", glow = false }: PanelProps) {
  return (
    <div className={`panel ${glow ? "animate-abyss-glow" : ""} ${className}`}>
      <div className="relative z-10 p-5 md:p-6">
        {title && (
          <div className="mb-5">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="heading-rune">{title}</h3>
              <div className="divider-ornate flex-1" />
            </div>
            {subtitle && (
              <p className="text-muted text-[10px] tracking-wide-custom uppercase">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string | number;
  max?: string | number;
  accent?: "gold" | "teal" | "blood";
  showBar?: boolean;
  barValue?: number;
}

export function StatRow({ label, value, max, accent = "gold", showBar = false, barValue = 0 }: StatRowProps) {
  const accentColors = {
    gold: "text-gold",
    teal: "text-accent",
    blood: "text-[oklch(0.42_0.18_25)]",
  };

  const barColors = {
    gold: "bg-gradient-to-r from-[oklch(0.85_0.14_82)] to-[oklch(0.65_0.12_70)]",
    teal: "bg-gradient-to-r from-[oklch(0.55_0.13_215)] to-[oklch(0.45_0.10_220)]",
    blood: "bg-gradient-to-r from-[oklch(0.42_0.18_25)] to-[oklch(0.35_0.15_25)]",
  };

  void barColors;

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-muted text-[11px] tracking-rune uppercase">{label}</span>
      <div className="flex items-center gap-3">
        {showBar && (
          <div className="stat-bar w-16 md:w-24">
            <span style={{ width: `${Math.min(barValue, 100)}%` }} />
          </div>
        )}
        <span className={`${accentColors[accent]} font-mono text-sm tabular-nums font-semibold`}>
          {value}
          {max && <span className="text-muted text-xs">/{max}</span>}
        </span>
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h2 className="heading-rune mb-2">{title}</h2>
      {subtitle && (
        <p className="text-muted text-[10px] tracking-wide-custom uppercase">{subtitle}</p>
      )}
    </div>
  );
}

interface AttunementCardProps {
  name: string;
  color: string;
  value: number;
  max: number;
}

export function AttunementCard({ name, color, value, max }: AttunementCardProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="panel relative overflow-hidden group">
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: color }}
      />
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
          >
            <span className="text-2xl font-display font-bold" style={{ color }}>
              {value}
            </span>
          </div>
        </div>
        <div className="text-muted text-[10px] tracking-rune uppercase mb-2">{name}</div>
        <div className="stat-bar">
          <span 
            className="block h-full rounded-sm"
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(135deg, ${color}, ${color}80)`,
              boxShadow: `0 0 8px ${color}80`
            }}
          />
        </div>
      </div>
    </div>
  );
}
