import { useActionState, useEffect, useRef } from "react";
import { updateTextAction } from "../action";
import { useTextContext } from "../contexts/text";

export function TextInputForm() {
  const { updateText, text: currentText } = useTextContext();
  const lastProcessedText = useRef<string>("");

  // useActionState for handling form submission
  const [state, formAction, isPending] = useActionState(updateTextAction, {
    text: "",
    success: false,
    error: false,
  });

  // Update context when form action succeeds (prevent infinite loop)
  useEffect(() => {
    if (
      state.success &&
      state.text &&
      state.text !== lastProcessedText.current
    ) {
      // Only update if the text is different from what we last processed
      // and different from current context text
      if (state.text !== currentText) {
        lastProcessedText.current = state.text;
        updateText(state.text);
      }
    }
  }, [state.success, state.text, currentText]); // Removed updateText from dependencies

  return (
    <div>
      <h3>Update Text with Form Action</h3>
      <form
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          maxWidth: "300px",
        }}
      >
        <input
          type="text"
          name="text"
          placeholder="Enter new text..."
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          disabled={isPending}
        />
        <button
          formAction={formAction}
          disabled={isPending}
          style={{
            padding: "10px",
            backgroundColor: isPending ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Updating..." : "Update Text"}
        </button>

        {state.error && (
          <p style={{ margin: 0, color: "red", fontSize: "14px" }}>
            Error: Please enter valid text
          </p>
        )}

        {state.success && (
          <p style={{ margin: 0, color: "green", fontSize: "14px" }}>
            Text updated successfully!
          </p>
        )}
      </form>
    </div>
  );
}
