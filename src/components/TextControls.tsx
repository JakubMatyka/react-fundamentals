import { useTextContext } from "../contexts/text";

export function TextControls() {
  const { text, clearText, resetText, history } = useTextContext();

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
        Text Controls (useReducer Actions)
      </h4>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={clearText}
          className="px-4 py-2 bg-gradient-to-r from-slate-500 to-gray-600 dark:from-slate-600 dark:to-gray-700 text-white rounded-xl font-medium hover:from-slate-600 hover:to-gray-700 dark:hover:from-slate-700 dark:hover:to-gray-800 transition-all duration-200 text-sm shadow-lg hover:shadow-xl"
        >
          Clear Text
        </button>
        <button
          onClick={resetText}
          className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 text-white rounded-xl font-medium hover:from-sky-600 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-pink-700 transition-all duration-200 text-sm shadow-lg hover:shadow-xl"
        >
          Reset to Default
        </button>
      </div>
      <div className="bg-sky-50/50 dark:bg-slate-700/30 border border-sky-200/50 dark:border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-sky-600 dark:text-purple-400 font-medium text-sm">
          Current Text:{" "}
          <span className="text-gray-900 dark:text-gray-100">"{text}"</span> •
          History Length:{" "}
          <span className="text-gray-900 dark:text-gray-100">
            {history.length}
          </span>
        </p>
      </div>
    </div>
  );
}
