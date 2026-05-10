import { TASKS, TASK_CATEGORIES } from "../constants";
import type { Character } from "../types";

interface TaskCheckerProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
}

export function TaskChecker({ character, onUpdate }: TaskCheckerProps) {
  const toggleTask = (taskId: string) => {
    const newTasks = character.completedTasks.includes(taskId)
      ? character.completedTasks.filter((id) => id !== taskId)
      : [...character.completedTasks, taskId];
    onUpdate({ completedTasks: newTasks });
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "Blood": 
      case "Bosses": 
        return { 
          border: "border-l-[oklch(0.42_0.18_25)/0.5]", 
          text: "text-[oklch(0.42_0.18_25)]", 
          bg: "bg-[oklch(0.42_0.18_25)/0.05]",
          accent: "bg-[oklch(0.42_0.18_25)/0.1]",
        };
      case "Endgame": 
        return { 
          border: "border-l-[oklch(0.82_0.18_85)/0.5]", 
          text: "text-[oklch(0.82_0.18_85)]", 
          bg: "bg-[oklch(0.82_0.18_85)/0.05]",
          accent: "bg-[oklch(0.82_0.18_85)/0.1]",
        };
      case "Special": 
        return { 
          border: "border-l-[oklch(0.45_0.20_285)/0.5]", 
          text: "text-[oklch(0.45_0.20_285)]", 
          bg: "bg-[oklch(0.45_0.20_285)/0.05]",
          accent: "bg-[oklch(0.45_0.20_285)/0.1]",
        };
      default: 
        return { 
          border: "border-l-[oklch(0.55_0.13_215)/0.4]", 
          text: "text-accent", 
          bg: "bg-[oklch(0.55 0.13 215 / 0.05)]",
          accent: "bg-[oklch(0.55 0.13 215 / 0.1)]",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {TASK_CATEGORIES.map((category) => {
        const categoryTasks = TASKS.filter((t) => t.category === category);
        if (categoryTasks.length === 0) return null;

        const completedCount = categoryTasks.filter((t) =>
          character.completedTasks.includes(t.id)
        ).length;
        
        const styles = getCategoryStyle(category);
        const allCompleted = completedCount === categoryTasks.length;

        return (
          <div 
            key={category} 
            className={`panel overflow-hidden ${styles.border} ${allCompleted ? 'shadow-lg' : ''}`}
            style={{ borderLeftWidth: '2px' }}
          >
            <div className={`${styles.bg} px-5 py-4 flex justify-between items-center`}>
              <div className="flex flex-col">
                <h3 className={`font-display tracking-rune text-xs uppercase ${styles.text}`}>
                  {category}
                </h3>
                <span className="text-muted text-[9px] tracking-wide uppercase font-medium">Echoes of the past</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs tabular-nums font-semibold ${allCompleted ? 'text-gold' : 'text-muted'}`}>
                  {completedCount}<span className="opacity-30 mx-1">/</span>{categoryTasks.length}
                </span>
                {allCompleted && (
                  <div className="echo-orb w-2 h-2 animate-glow" />
                )}
              </div>
            </div>
            <div className="p-4 space-y-1.5">
              {categoryTasks.map((task) => {
                const isChecked = character.completedTasks.includes(task.id);
                return (
                  <label
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all duration-300 ${
                      isChecked
                        ? styles.accent
                        : "hover:bg-[oklch(0.16_0.025_220/0.5)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTask(task.id)}
                        className="sr-only"
                      />
                      <div 
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                          isChecked
                            ? "bg-accent border border-accent"
                            : "border border-rune"
                        }`}
                        style={isChecked ? { boxShadow: '0 0 10px oklch(0.55 0.13 215 / 0.3)' } : {}}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3 text-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm tracking-wide transition-all duration-300 ${
                          isChecked
                            ? "text-muted line-through italic"
                            : "text-foreground"
                        }`}
                      >
                        {task.name}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-mono tabular-nums font-semibold transition-colors ml-2 ${
                        isChecked ? "opacity-40" : 
                        task.color === "blood" || task.category === "Bosses"
                          ? "text-[oklch(0.42_0.18_25)]"
                          : task.category === "Endgame"
                          ? "text-[oklch(0.82_0.18_85)]"
                          : "text-accent"
                      }`}
                    >
                      +{task.value}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
