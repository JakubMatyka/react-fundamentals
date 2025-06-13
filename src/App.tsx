import { TextInputForm } from "./components/TextInputForm";
import { TextDisplay } from "./components/TextDisplay";
import { TextControls } from "./components/TextControls";
import { TaskManager } from "./components/TaskManager";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { TextProvider } from "./contexts/text";
import { ThemeProvider } from "./contexts/theme";

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 relative transition-all duration-500">
      <ThemeSwitcher />

      {/* Header */}
      <header className="text-center pt-8 pb-6 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-sky-600 to-blue-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          React Fundamentals
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-purple-500 dark:to-pink-500 mx-auto rounded-full"></div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column - Text Components */}
          <div className="space-y-6">
            {/* Text Display Component */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-sky-200/50 dark:border-purple-500/30 shadow-lg shadow-sky-100/50 dark:shadow-purple-900/20 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sky-200/60 dark:hover:shadow-purple-900/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  T
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Text Display Component
                  </h3>
                  <p className="text-sm text-sky-600 dark:text-purple-400 font-medium">
                    Manage and update text with state
                  </p>
                </div>
              </div>
              <TextDisplay />
            </div>

            {/* Text Input Form */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-sky-200/50 dark:border-purple-500/30 shadow-lg shadow-sky-100/50 dark:shadow-purple-900/20 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sky-200/60 dark:hover:shadow-purple-900/30">
              <TextInputForm />
            </div>

            {/* Text Controls */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-sky-200/50 dark:border-purple-500/30 shadow-lg shadow-sky-100/50 dark:shadow-purple-900/20 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sky-200/60 dark:hover:shadow-purple-900/30">
              <TextControls />
            </div>
          </div>

          {/* Right Column - Task Manager */}
          <div className="lg:col-span-1">
            <TaskManager />
          </div>
        </div>

        {/* Bottom Section - What's happening behind the scenes */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-sky-200/50 dark:border-purple-500/30 shadow-lg shadow-sky-100/50 dark:shadow-purple-900/20 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sky-200/60 dark:hover:shadow-purple-900/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <svg
                width="16"
                height="16"
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              What's happening behind the scenes?
            </h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base">
            This application demonstrates key React concepts including state
            management with hooks, component composition, event handling, and
            performance optimization techniques like{" "}
            <code className="px-2 py-1 bg-sky-100 dark:bg-purple-900/40 text-sky-700 dark:text-purple-300 rounded-lg font-mono text-sm border border-sky-200 dark:border-purple-700">
              useOptimistic
            </code>{" "}
            and{" "}
            <code className="px-2 py-1 bg-purple-100 dark:bg-pink-900/40 text-purple-700 dark:text-pink-300 rounded-lg font-mono text-sm border border-purple-200 dark:border-pink-700">
              useTransition
            </code>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-50/50 dark:bg-slate-700/30 p-4 rounded-xl border border-sky-100 dark:border-slate-600">
              <h4 className="font-semibold text-sky-700 dark:text-sky-400 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                State Management
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  useReducer for complex state logic
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  Context API for global state sharing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  useActionState for form handling
                </li>
              </ul>
            </div>
            <div className="bg-purple-50/50 dark:bg-slate-700/30 p-4 rounded-xl border border-purple-100 dark:border-slate-600">
              <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Performance
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  useOptimistic for immediate UI feedback
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  useTransition for non-blocking updates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  Component composition patterns
                </li>
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
