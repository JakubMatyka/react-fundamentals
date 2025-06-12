import { useTextContext } from "../contexts/text";

export function TextControls() {
  const { text, history, clearText, resetText } = useTextContext();

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">
        Text Controls (useReducer Actions)
      </h4>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={clearText}
          className="px-3 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 text-sm"
        >
          Clear Text
        </button>
        <button
          onClick={resetText}
          className="px-3 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 text-sm"
        >
          Reset to Default
        </button>
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-400">
        Current Text: <span className="font-mono">"{text}"</span> • History
        Length: {history.length}
      </div>
    </div>
  );
}
