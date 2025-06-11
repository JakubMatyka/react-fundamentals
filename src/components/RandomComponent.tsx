import { useTextContext } from "../contexts/text";

export const RandomComponent = () => {
  const { text } = useTextContext();

  return (
    <div>
      <h3>Text from Context:</h3>
      <p
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {text}
      </p>
    </div>
  );
};
