import { useActionState } from "react";
import { useTextContext } from "../contexts/text";
import { updateTextAction } from "../action";

export function TextInputForm() {
  const { text } = useTextContext();
  const [state, formAction, isPending] = useActionState(updateTextAction, {
    text: text,
    success: false,
    error: false,
  });

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
        Update Text with Form Action
      </h4>
      <form action={formAction} className="space-y-4">
        <input
          type="text"
          name="text"
          defaultValue={text}
          className="w-full text-sm px-4 py-3 bg-white/80 dark:bg-slate-700/80 border border-sky-200 dark:border-purple-500/50 rounded-xl text-gray-900 dark:text-white placeholder-sky-500/70 dark:placeholder-purple-400/70 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
          placeholder="Enter new text..."
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 dark:from-purple-500 dark:to-pink-600 text-white rounded-xl font-medium hover:from-sky-600 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm shadow-lg hover:shadow-xl"
        >
          {isPending ? "Updating..." : "Update Text"}
        </button>
      </form>
      {state.success && (
        <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50/50 dark:bg-emerald-900/20 px-3 py-2 rounded-xl backdrop-blur-sm">
          ✅ Text updated successfully!
        </div>
      )}
      {state.error && (
        <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50/50 dark:bg-red-900/20 px-3 py-2 rounded-xl backdrop-blur-sm">
          ❌ Please enter valid text
        </div>
      )}
    </div>
  );
}
