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
          accent: "bg-blood/10",
          glow: "group-hover:border-blood/30"
        };
      case "Endgame": 
        return { 
          border: "border-l-thunder/40", 
          text: "text-thunder", 
          bg: "bg-thunder/5",
          accent: "bg-thunder/10",
          glow: "group-hover:border-thunder/30"
        };
      case "Special": 
        return { 
          border: "border-l-shadow/40", 
          text: "text-shadow", 
          bg: "bg-shadow/5",
          accent: "bg-shadow/10",
          glow: "group-hover:border-shadow/30"
        };
      default: 
        return { 
          border: "border-l-cyan_wind/30", 
          text: "text-cyan_wind", 
          bg: "bg-cyan_wind/5",
          accent: "bg-cyan_wind/10",
          glow: "group-hover:border-cyan_wind/30"
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {TASK_CATEGORIES.map((category) => {
        const categoryTasks = TASKS.filter((t) => t.category === category);
        if (categoryTasks.length === 0) return null;

        const completedCount = categoryTasks.filter((t) =>
          character.completedTasks.includes(t.id)
        ).length;
        
        const styles = getCategoryStyle(category);
        const allCompleted = completedCount === categoryTasks.length;

        return (
          <div key={category} className={`abyss-card rounded-xl overflow-hidden group ${styles.border} ${allCompleted ? 'border-opacity-100 shadow-[0_0_20px_rgba(0,229,255,0.05)]' : ''}`}>
            <div className={`${styles.bg} px-6 py-4 flex justify-between items-center border-b border-white/5`}>
              <div className="flex flex-col">
                <h3 className={`font-serif tracking-widest text-sm uppercase ${styles.text}`}>{category}</h3>
                <span className="text-[10px] text-text_dim tracking-tight font-medium">Echoes of the past</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold ${allCompleted ? 'text-cyan_wind' : 'text-text_dim'}`}>
                  {completedCount}<span className="text-text_dim/30 mx-1">/</span>{categoryTasks.length}
                </span>
                {allCompleted && (
                  <div className="w-2 h-2 rounded-full bg-cyan_wind cyan-depth-glow"></div>
                )}
              </div>
            </div>
            <div className="p-4 space-y-1.5">
              {categoryTasks.map((task) => {
                const isChecked = character.completedTasks.includes(task.id);
                return (
                  <label
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 group/item ${
                      isChecked
                        ? styles.accent
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTask(task.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center shrink-0 ${
                        isChecked
                          ? "bg-cyan_wind border-cyan_wind shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                          : "border-white/10 group-hover/item:border-white/20"
                      }`}>
                        {isChecked && (
                          <svg className="w-3.5 h-3.5 text-abyss_dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm tracking-wide transition-all duration-300 ${
                          isChecked
                            ? "text-text_dim/60 line-through italic"
                            : "text-text_main"
                        }`}
                      >
                        {task.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-mono font-semibold transition-colors ${
                          isChecked ? "text-text_dim/40" : 
                          task.color === "blood"
                            ? "text-blood"
                            : task.category === "Endgame"
                            ? "text-thunder"
                            : "text-cyan_wind"
                        }`}
                      >
                        +{task.value}
                      </span>
                    </div>
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