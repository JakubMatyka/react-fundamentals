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
    const baseStyles =
      "px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide";
    if (isCompleted)
      return `${baseStyles} bg-gray-600 dark:bg-gray-700 text-gray-400`;

    switch (priority) {
      case "high":
        return `${baseStyles} bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800`;
      case "medium":
        return `${baseStyles} bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800`;
      case "low":
        return `${baseStyles} bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800`;
      default:
        return baseStyles;
    }
  };

  const getTaskBorderColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 dark:border-l-red-400";
      case "medium":
        return "border-l-blue-500 dark:border-l-blue-400";
      case "low":
        return "border-l-green-500 dark:border-l-green-400";
      default:
        return "border-l-transparent";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6 h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs">
          🚀
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0 text-sm">
            Task Manager
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>useOptimistic</strong>: Immediate UI updates •{" "}
            <strong>useTransition</strong>: Smooth expensive operations
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-2 py-1 rounded-lg mb-3 text-xs">
          ❌ {error}
        </div>
      )}

      {/* Add Task Section */}
      <div className="bg-gray-100 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600/50 rounded-lg p-2 mb-4">
        <div className="flex flex-wrap gap-1 items-center">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 min-w-32 text-xs py-1 px-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <select
            value={newTaskPriority}
            onChange={(e) =>
              setNewTaskPriority(e.target.value as Task["priority"])
            }
            className="text-xs py-1 px-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={handleAddTask}
            className="px-2 py-1 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 text-xs whitespace-nowrap"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-xs text-gray-600 dark:text-gray-400 mr-1">
            Filter:
          </span>
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            disabled={isPending}
          >
            All ({optimisticTasks.length})
          </button>
          <button
            onClick={() => handleFilterChange("pending")}
            className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            disabled={isPending}
          >
            Pending ({optimisticTasks.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            disabled={isPending}
          >
            Completed ({optimisticTasks.filter((t) => t.completed).length})
          </button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as TaskSort)}
            disabled={isPending}
            className="text-xs py-1 px-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
          >
            <option value="created">Date Created</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {isPending && (
          <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
            ⏳ Processing...
          </div>
        )}
      </div>

      {/* Task List */}
      <div
        className={`space-y-1 min-h-32 transition-opacity duration-300 ${
          isPending ? "opacity-60" : ""
        }`}
      >
        {processedTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600/50 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600/30 border-l-4 ${getTaskBorderColor(
              task.priority
            )} ${task.completed ? "opacity-60" : ""}`}
          >
            <button
              onClick={() => handleToggleTask(task.id)}
              className="text-xs hover:scale-110 transition-transform duration-200"
              title={task.completed ? "Mark as pending" : "Mark as completed"}
            >
              {task.completed ? "✅" : "⭕"}
            </button>

            <div className="flex-1 min-w-0">
              <div
                className={`font-medium break-words text-xs ${
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
              )} text-xs`}
            >
              {task.priority}
            </span>

            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {task.createdAt.toLocaleDateString()}
            </span>

            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-xs hover:scale-110 transition-transform duration-200 opacity-60 hover:opacity-100 hover:text-red-500 dark:hover:text-red-400"
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
