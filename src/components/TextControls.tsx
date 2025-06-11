import { useTextContext } from "../contexts/text";

export function TextControls() {
  const { text, history, clearText, undoText, resetText } = useTextContext();

  return (
    <div>
      <h3>Text Controls (useReducer Actions)</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={clearText}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Text
        </button>

        <button
          onClick={undoText}
          disabled={history.length === 0}
          style={{
            padding: "8px 16px",
            backgroundColor: history.length === 0 ? "#ccc" : "#ffc107",
            color: history.length === 0 ? "#666" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: history.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Undo ({history.length})
        </button>

        <button
          onClick={resetText}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset to Default
        </button>
      </div>

      <div
        style={{
          padding: "10px",
          border: "1px solid #e9ecef",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <strong>Current Text:</strong> "{text}"
        <br />
        <strong>History Length:</strong> {history.length}
        {history.length > 0 && (
          <>
            <br />
            <strong>Previous States:</strong> [
            {history
              .slice(-3)
              .map((h) => `"${h}"`)
              .join(", ")}
            {history.length > 3 && "..."}]
          </>
        )}
      </div>
    </div>
  );
}
