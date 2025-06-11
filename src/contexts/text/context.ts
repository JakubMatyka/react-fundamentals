import { createContext, useContext } from "react";
import type { TextContextType } from "./types";

export const TextContext = createContext<TextContextType>({
  text: "Default text",
  history: [],
  updateText: () => {},
  clearText: () => {},
  undoText: () => {},
  resetText: () => {},
});

export const useTextContext = () => {
  const context = useContext(TextContext);

  if (!context) {
    throw new Error("useTextContext must be used within a TextProvider");
  }

  return context;
};
