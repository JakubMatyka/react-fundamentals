import { TextInputForm } from "./components/TextInputForm";
import { TextDisplay } from "./components/TextDisplay";
import { TextControls } from "./components/TextControls";
import { TaskManager } from "./components/TaskManager";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { TextProvider } from "./contexts/text";
import { ThemeProvider } from "./contexts/theme";

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <ThemeSwitcher />

      {/* Header */}
      <header className="text-center pt-6 pb-4 px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          React Fundamentals
        </h1>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-3 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Left Column - Text Components */}
          <div className="space-y-4">
            {/* Text Display Component */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  T
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0 text-sm">
                    Text Display Component
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Manage and update text with state
                  </p>
                </div>
              </div>
              <TextDisplay />
            </div>

            {/* Text Input Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
              <TextInputForm />
            </div>

            {/* Text Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
              <TextControls />
            </div>
          </div>

          {/* Right Column - Task Manager */}
          <div className="lg:col-span-1">
            <TaskManager />
          </div>
        </div>

        {/* Bottom Section - What's happening behind the scenes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 17H12.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0 text-sm">
              What's happening behind the scenes?
            </h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-xs">
            This application demonstrates key React concepts including state
            management with hooks, component composition, event handling, and
            performance optimization techniques like{" "}
            <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded font-mono text-xs">
              useOptimistic
            </code>{" "}
            and{" "}
            <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded font-mono text-xs">
              useTransition
            </code>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1 text-xs">
                State Management
              </h4>
              <ul className="space-y-0.5 text-gray-600 dark:text-gray-400 text-xs">
                <li>• useReducer for complex state logic</li>
                <li>• Context API for global state sharing</li>
                <li>• useActionState for form handling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-1 text-xs">
                Performance
              </h4>
              <ul className="space-y-0.5 text-gray-600 dark:text-gray-400 text-xs">
                <li>• useOptimistic for immediate UI feedback</li>
                <li>• useTransition for non-blocking updates</li>
                <li>• Component composition patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TextProvider initialText="Welcome to React Fundamentals!">
        <AppContent />
      </TextProvider>
    </ThemeProvider>
  );
}

export default App;
