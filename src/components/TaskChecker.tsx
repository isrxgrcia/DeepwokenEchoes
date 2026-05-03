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
        return { 
          border: "border-l-blood/40", 
          text: "text-blood", 
          bg: "bg-blood/5",
          accent: "bg-blood/20"
        };
      case "Endgame": 
        return { 
          border: "border-l-thunder/40", 
          text: "text-thunder", 
          bg: "bg-thunder/5",
          accent: "bg-thunder/20"
        };
      case "Special": 
        return { 
          border: "border-l-shadow/40", 
          text: "text-shadow", 
          bg: "bg-shadow/5",
          accent: "bg-shadow/20"
        };
      default: 
        return { 
          border: "border-l-iron/30", 
          text: "text-text_main", 
          bg: "bg-transparent",
          accent: "bg-iron/10"
        };
    }
  };

  return (
    <div className="space-y-4">
      {TASK_CATEGORIES.map((category) => {
        const categoryTasks = TASKS.filter((t) => t.category === category);
        if (categoryTasks.length === 0) return null;

        const completedCount = categoryTasks.filter((t) =>
          character.completedTasks.includes(t.id)
        ).length;
        
        const styles = getCategoryStyle(category);
        const allCompleted = completedCount === categoryTasks.length;

        return (
          <div key={category} className={`abyss-card rounded-lg overflow-hidden ${styles.border} ${allCompleted ? 'border-cyan_wind/20' : ''}`}>
            <div className={`${styles.bg} px-5 py-4 flex justify-between items-center`}>
              <h3 className={`font-serif tracking-wide ${styles.text}`}>{category}</h3>
              <div className="flex items-center gap-2">
                <div className={`h-px w-8 ${styles.border}`}></div>
                <span className={`text-xs font-mono tracking-wider ${styles.text}`}>
                  {completedCount}<span className="text-text_dim/50">/{categoryTasks.length}</span>
                </span>
              </div>
            </div>
            <div className="p-3 space-y-1">
              {categoryTasks.map((task) => (
                <label
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all hover:bg-depth_hover/30 ${
                    character.completedTasks.includes(task.id)
                      ? styles.accent
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={character.completedTasks.includes(task.id)}
                      onChange={() => toggleTask(task.id)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                      character.completedTasks.includes(task.id)
                        ? "bg-cyan_wind border-cyan_wind"
                        : "border-border"
                    }`}>
                      {character.completedTasks.includes(task.id) && (
                        <svg className="w-3 h-3 text-abyss_dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm tracking-wide transition-colors ${
                        character.completedTasks.includes(task.id)
                          ? "text-text_dim line-through"
                          : "text-text_main"
                      }`}
                    >
                      {task.name}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-mono ${
                      task.color === "blood"
                        ? "text-blood"
                        : task.category === "Endgame"
                        ? "text-thunder"
                        : "text-cyan_wind"
                    }`}
                  >
                    +{task.value}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}