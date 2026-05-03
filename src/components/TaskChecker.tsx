import { TASKS, TASK_CATEGORIES } from "../constants";
import type { Character, Task } from "../types";

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

  const getTaskColor = (task: Task) => {
    if (task.color === "blood") return "text-blood border-blood/30";
    if (task.category === "Endgame") return "text-thunder border-thunder/30";
    if (task.category === "Special") return "text-shadow border-shadow/30";
    return "text-text_main border-border";
  };

  return (
    <div className="space-y-4">
      {TASK_CATEGORIES.map((category) => {
        const categoryTasks = TASKS.filter((t) => t.category === category);
        if (categoryTasks.length === 0) return null;

        const completedCount = categoryTasks.filter((t) =>
          character.completedTasks.includes(t.id)
        ).length;

        return (
          <div key={category} className="border border-border rounded-lg overflow-hidden">
            <div className="bg-bg_card px-4 py-3 flex justify-between items-center">
              <h3 className="font-semibold text-text_main">{category}</h3>
              <span className="text-sm text-text_dim">
                {completedCount}/{categoryTasks.length}
              </span>
            </div>
            <div className="p-3 space-y-2 bg-bg_darker">
              {categoryTasks.map((task) => (
                <label
                  key={task.id}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    character.completedTasks.includes(task.id)
                      ? "bg-bg_hover"
                      : "hover:bg-bg_hover/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={character.completedTasks.includes(task.id)}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span
                      className={
                        character.completedTasks.includes(task.id)
                          ? "text-text_dim line-through"
                          : getTaskColor(task)
                      }
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
                        : "text-gold"
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