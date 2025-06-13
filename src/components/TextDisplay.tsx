import { useTextContext } from "../contexts/text";

export function TextDisplay() {
  const { text } = useTextContext();

  return (
    <div className="space-y-4">
      <p className="text-sky-600 dark:text-purple-400 font-medium">
        Current Text:
      </p>
      <div className="bg-sky-50/70 dark:bg-slate-700/50 border border-sky-200/50 dark:border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-gray-900 dark:text-gray-100 font-medium text-lg break-words">
          "{text}"
        </p>
      </div>
    </div>
  );
}
