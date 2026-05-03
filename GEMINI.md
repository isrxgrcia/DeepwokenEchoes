# Deepwoken Wind Tracker - Agent Instructions

## Commands
```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build (tsc -b && vite build)
npm run lint    # ESLint check
npm run preview # Preview production build
```

## Project Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first config via `@import "tailwindcss"` + `@theme`)
- **No** tailwind.config.js (removed in migration)

## Structure
```
src/
├── constants/   # Hardcoded game data (races, weapons, tasks, modifiers)
├── types/       # TypeScript interfaces
├── hooks/       # Custom hooks (localStorage via useCharacterDatabase)
├── components/  # React components
└── App.tsx      # Main application
```

## Critical Notes
- **Tailwind v4 setup**: Uses `@tailwindcss/postcss` plugin in postcss.config.js (not tailwindcss directly)
- **localStorage key**: `"deepwoken_characters"` (stores CharacterDatabase with up to 6 characters)
- **Character interface**: `id`, `name`, `race`, `weapon`, `attunements`, `completedTasks`, `activeModifiers`, `createdAt`
- **No subrace field** (removed per user request)

## Wind Calculation
```
Total = BasePoints × (1.0 + Σ(activeModifiers))
```
Rank thresholds: W≥140, S≥112, A≥87, B≥60, C≥30, D≥1, E≥0

## Common Mistakes to Avoid
- Do NOT use `tailwind.config.js` with Tailwind v4 - use CSS `@theme` block
- Do NOT use `tailwindcss` directly in PostCSS - use `@tailwindcss/postcss`
- Windows: use `workdir` param in Bash, NOT `cd`
- Never ask user to commit - only when explicitly requested