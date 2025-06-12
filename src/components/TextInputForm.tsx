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
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base">
        Update Text with Form Action
      </h4>
      <form action={formAction} className="space-y-3">
        <input
          type="text"
          name="text"
          defaultValue={text}
          className="w-full text-sm px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter new text..."
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
        >
          {isPending ? "Updating..." : "Update Text"}
        </button>
      </form>
      {state.success && (
        <div className="text-green-600 dark:text-green-400 text-xs font-medium">
          ✅ Text updated successfully!
        </div>
      )}
      {state.error && (
        <div className="text-red-600 dark:text-red-400 text-xs font-medium">
          ❌ Please enter valid text
        </div>
      )}
    </div>
  );
}
