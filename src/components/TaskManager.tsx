import { useEffect, useOptimistic, useState, useTransition } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
};

type TaskFilter = "all" | "pending" | "completed";
type TaskSort = "created" | "priority" | "alphabetical";

// Simulate async operations
const simulateNetworkDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Simulate server operations with potential failures
const addTaskToServer = async (
  task: Omit<Task, "id" | "createdAt">
): Promise<Task> => {
  await simulateNetworkDelay(1000 + Math.random() * 1000); // 1-2 seconds

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Failed to add task to server");
  }

  return {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
};

const toggleTaskOnServer = async (_taskId: string): Promise<void> => {
  await simulateNetworkDelay(500 + Math.random() * 500); // 0.5-1 seconds

  // Simulate occasional failures (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to update task on server");
  }
};

const deleteTaskFromServer = async (_taskId: string): Promise<void> => {
  await simulateNetworkDelay(300 + Math.random() * 300); // 0.3-0.6 seconds

  // Simulate occasional failures (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to delete task from server");
  }
};

// Expensive sorting function to demonstrate useTransition
const expensiveSort = (tasks: Task[], sortBy: TaskSort): Task[] => {
  // Simulate expensive computation
  const start = performance.now();
  while (performance.now() - start < 50) {
    // Busy wait to simulate heavy computation
  }

  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case "created":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "priority": {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      case "alphabetical":
        return a.text.localeCompare(b.text);
      default:
        return 0;
    }
  });
};

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Learn useOptimistic hook",
      completed: false,
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      priority: "high",
    },
    {
      id: "2",
      text: "Master useTransition hook",
      completed: false,
      createdAt: new Date(Date.now() - 43200000), // 12 hours ago
      priority: "high",
    },
    {
      id: "3",
      text: "Build awesome React apps",
      completed: true,
      createdAt: new Date(Date.now() - 21600000), // 6 hours ago
      priority: "medium",
    },
  ]);

  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sortBy, setSortBy] = useState<TaskSort>("created");
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] =
    useState<Task["priority"]>("medium");
  const [error, setError] = useState<string | null>(null);

  // useTransition for expensive filtering and sorting operations
  const [isPending, startTransition] = useTransition();

  // useOptimistic for immediate UI updates while server operations are pending
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (
      state: Task[],
      optimisticTask: {
        type: "add" | "toggle" | "delete";
        task?: Task;
        taskId?: string;
      }
    ) => {
      switch (optimisticTask.type) {
        case "add":
          return optimisticTask.task ? [...state, optimisticTask.task] : state;
        case "toggle":
          return state.map((task) =>
            task.id === optimisticTask.taskId
              ? { ...task, completed: !task.completed }
              : task
          );
        case "delete":
          return state.filter((task) => task.id !== optimisticTask.taskId);
        default:
          return state;
      }
    }
  );

  // Filtered and sorted tasks using expensive operations
  const [processedTasks, setProcessedTasks] = useState<Task[]>([]);

  useEffect(() => {
    startTransition(() => {
      // Filter tasks
      let filtered = optimisticTasks;
      if (filter === "pending") {
        filtered = optimisticTasks.filter((task) => !task.completed);
      } else if (filter === "completed") {
        filtered = optimisticTasks.filter((task) => task.completed);
      }

      // Sort tasks (expensive operation)
      const sorted = expensiveSort(filtered, sortBy);
      setProcessedTasks(sorted);
    });
  }, [optimisticTasks, filter, sortBy]);

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;

    const optimisticTask: Task = {
      id: `temp-${Date.now()}`, // Temporary ID
      text: newTaskText.trim(),
      completed: false,
      createdAt: new Date(),
      priority: newTaskPriority,
    };

    // Optimistically add the task
    addOptimisticTask({ type: "add", task: optimisticTask });
    setNewTaskText("");
    setError(null);

    try {
      // Attempt to add task to server
      const serverTask = await addTaskToServer({
        text: optimisticTask.text,
        completed: optimisticTask.completed,
        priority: optimisticTask.priority,
      });

      // Replace optimistic task with server response
      setTasks((prevTasks) => [
        ...prevTasks.filter((t) => t.id !== optimisticTask.id),
        serverTask,
      ]);
    } catch (err) {
      // Revert optimistic update on failure
      setTasks((prevTasks) =>
        prevTasks.filter((t) => t.id !== optimisticTask.id)
      );
      setError(err instanceof Error ? err.message : "Failed to add task");
    }
  };

  const handleToggleTask = async (taskId: string) => {
    // Optimistically toggle the task
    addOptimisticTask({ type: "toggle", taskId });
    setError(null);

    try {
      await toggleTaskOnServer(taskId);

      // Update the actual state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err) {
      // Revert optimistic update on failure
      setTasks((prevTasks) => [...prevTasks]); // Force re-render to revert optimistic state
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    // Optimistically delete the task
    addOptimisticTask({ type: "delete", taskId });
    setError(null);

    try {
      await deleteTaskFromServer(taskId);

      // Update the actual state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      // Revert optimistic update on failure
      setTasks((prevTasks) => [...prevTasks]); // Force re-render to revert optimistic state
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  const handleFilterChange = (newFilter: TaskFilter) => {
    startTransition(() => {
      setFilter(newFilter);
    });
  };

  const handleSortChange = (newSort: TaskSort) => {
    startTransition(() => {
      setSortBy(newSort);
    });
  };

  const getPriorityStyles = (
    priority: Task["priority"],
    isCompleted: boolean = false
  ) => {
    if (isCompleted) {
      return "bg-gray-200/50 dark:bg-slate-600/50 text-gray-500 dark:text-gray-400";
    }
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-500/20 to-pink-500/20 dark:from-red-400/30 dark:to-pink-400/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30";
      case "medium":
        return "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 dark:from-amber-400/30 dark:to-yellow-400/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30";
      case "low":
        return "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 dark:from-emerald-400/30 dark:to-teal-400/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30";
      default:
        return "bg-sky-100/50 dark:bg-purple-900/30 text-sky-600 dark:text-purple-400";
    }
  };

  const getTaskBorderColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 dark:border-l-red-400";
      case "medium":
        return "border-l-amber-500 dark:border-l-amber-400";
      case "low":
        return "border-l-emerald-500 dark:border-l-emerald-400";
      default:
        return "border-l-sky-500 dark:border-l-purple-500";
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-sky-200/50 dark:border-purple-500/30 shadow-lg shadow-sky-100/50 dark:shadow-purple-900/20 p-6 h-fit transition-all duration-300 hover:shadow-xl hover:shadow-sky-200/60 dark:hover:shadow-purple-900/30">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          🚀
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Task Manager
          </h3>
          <p className="text-sm text-sky-600 dark:text-purple-400 font-medium">
            <strong>useOptimistic</strong>: Immediate UI updates •{" "}
            <strong>useTransition</strong>: Smooth expensive operations
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 px-3 py-2 rounded-xl mb-4 text-sm backdrop-blur-sm">
          ❌ {error}
        </div>
      )}

      {/* Add Task Section */}
      <div className="bg-sky-50/50 dark:bg-slate-700/30 border border-sky-200/50 dark:border-purple-500/20 rounded-xl p-4 mb-6 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 min-w-40 text-sm py-2 px-4 bg-white/80 dark:bg-slate-700/80 border border-sky-200 dark:border-purple-500/50 rounded-lg text-gray-900 dark:text-white placeholder-sky-500/70 dark:placeholder-purple-400/70 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <select
            value={newTaskPriority}
            onChange={(e) =>
              setNewTaskPriority(e.target.value as Task["priority"])
            }
            className="text-sm py-2 px-3 bg-white/80 dark:bg-slate-700/80 border border-sky-200 dark:border-purple-500/50 rounded-lg text-gray-900 dark:text-white backdrop-blur-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 text-white rounded-lg font-medium hover:from-sky-600 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-pink-700 transition-all duration-200 text-sm whitespace-nowrap shadow-lg hover:shadow-xl"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-sky-600 dark:text-purple-400 font-medium mr-1">
            Filter:
          </span>
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === "all"
                ? "bg-gradient-to-r from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 text-white shadow-lg"
                : "bg-sky-100/50 dark:bg-slate-700/50 text-sky-700 dark:text-purple-300 hover:bg-sky-200/70 dark:hover:bg-slate-600/70 backdrop-blur-sm"
            }`}
            disabled={isPending}
          >
            All ({optimisticTasks.length})
          </button>
          <button
            onClick={() => handleFilterChange("pending")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === "pending"
                ? "bg-gradient-to-r from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 text-white shadow-lg"
                : "bg-sky-100/50 dark:bg-slate-700/50 text-sky-700 dark:text-purple-300 hover:bg-sky-200/70 dark:hover:bg-slate-600/70 backdrop-blur-sm"
            }`}
            disabled={isPending}
          >
            Pending ({optimisticTasks.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === "completed"
                ? "bg-gradient-to-r from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 text-white shadow-lg"
                : "bg-sky-100/50 dark:bg-slate-700/50 text-sky-700 dark:text-purple-300 hover:bg-sky-200/70 dark:hover:bg-slate-600/70 backdrop-blur-sm"
            }`}
            disabled={isPending}
          >
            Completed ({optimisticTasks.filter((t) => t.completed).length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-sky-600 dark:text-purple-400 font-medium">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as TaskSort)}
            disabled={isPending}
            className="text-sm py-1.5 px-3 bg-white/80 dark:bg-slate-700/80 border border-sky-200 dark:border-purple-500/50 rounded-lg text-gray-900 dark:text-white backdrop-blur-sm"
          >
            <option value="created">Date Created</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {isPending && (
          <div className="flex items-center gap-2 text-sm text-sky-600 dark:text-purple-400 font-medium bg-sky-50/50 dark:bg-purple-900/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            ⏳ Processing...
          </div>
        )}
      </div>

      {/* Task List */}
      <div
        className={`space-y-3 min-h-40 transition-opacity duration-300 ${
          isPending ? "opacity-60" : ""
        }`}
      >
        {processedTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-700/30 border border-sky-100 dark:border-purple-500/20 rounded-xl transition-all duration-200 hover:bg-sky-50/70 dark:hover:bg-slate-600/40 hover:shadow-md backdrop-blur-sm border-l-4 ${getTaskBorderColor(
              task.priority
            )} ${task.completed ? "opacity-70" : ""}`}
          >
            <button
              onClick={() => handleToggleTask(task.id)}
              className="text-lg hover:scale-110 transition-transform duration-200"
              title={task.completed ? "Mark as pending" : "Mark as completed"}
            >
              {task.completed ? "✅" : "⭕"}
            </button>

            <div className="flex-1 min-w-0">
              <div
                className={`font-medium break-words text-sm ${
                  task.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {task.text}
              </div>
            </div>

            <span
              className={`${getPriorityStyles(
                task.priority,
                task.completed
              )} text-sm px-2 py-1 rounded-full font-medium`}
            >
              {task.priority}
            </span>

            <span className="text-sm text-sky-600/80 dark:text-purple-400/80 whitespace-nowrap font-medium">
              {task.createdAt.toLocaleDateString()}
            </span>

            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-lg hover:scale-110 transition-transform duration-200 opacity-60 hover:opacity-100 hover:text-red-500 dark:hover:text-red-400"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        ))}

        {processedTasks.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400 italic text-xs">
            {filter === "all"
              ? "No tasks yet. Add some above!"
              : `No ${filter} tasks found.`}
          </div>
        )}
      </div>

      {/* Expandable Info Section */}
      <div className="mt-4 bg-gray-100 dark:bg-gray-700/20 rounded-lg">
        <details className="group">
          <summary className="cursor-pointer p-2 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 select-none text-xs">
            🔍 What's happening behind the scenes?
          </summary>
          <div className="px-2 pb-2 text-xs">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1 text-xs">
                  useOptimistic Hook:
                </h4>
                <ul className="space-y-0.5 text-gray-600 dark:text-gray-400 text-xs">
                  <li>
                    ✨ Tasks appear immediately when you add them (before server
                    confirms)
                  </li>
                  <li>⚡ Toggle/delete operations show instant feedback</li>
                  <li>
                    🔄 Automatically reverts changes if server operations fail
                  </li>
                  <li>🎯 Provides responsive UX even with slow network</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-1 text-xs">
                  useTransition Hook:
                </h4>
                <ul className="space-y-0.5 text-gray-600 dark:text-gray-400 text-xs">
                  <li>🚀 Expensive filtering/sorting doesn't block the UI</li>
                  <li>⏳ Shows loading indicator during processing</li>
                  <li>
                    🎯 Keeps the interface responsive during heavy operations
                  </li>
                  <li>📱 Allows interruption of slow operations</li>
                </ul>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
