import { useTextContext } from "../contexts/text";

export function TextDisplay() {
  const { text } = useTextContext();

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        Current Text:
      </div>
      <div className="p-3 bg-gray-100 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600/50 rounded-lg">
        <div className="font-mono text-sm text-gray-900 dark:text-gray-100 break-words">
          "{text}"
        </div>
      </div>
    </div>
  );
}
