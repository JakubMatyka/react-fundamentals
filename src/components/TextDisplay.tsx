import { useTextContext } from "../contexts/text";

export const TextDisplay = () => {
  const { text } = useTextContext();

  return (
    <div>
      <h3>Another Text Display Component:</h3>
      <div
        style={{
          padding: "15px",
          border: "2px solid #007bff",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        Current Text: "{text}"
      </div>
    </div>
  );
};
