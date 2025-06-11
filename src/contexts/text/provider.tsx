import { useReducer } from "react";
import { TextContext } from "./context";
import type { TextAction, TextProviderProps, TextState } from "./types";

function textReducer(state: TextState, action: TextAction): TextState {
  switch (action.type) {
    case "UPDATE_TEXT":
      // Don't add to history if the new text is the same as current text
      if (action.payload === state.text) {
        return state;
      }

      return {
        ...state,
        text: action.payload,
        history: [...state.history, state.text], // Save current text to history before updating
      };

    case "CLEAR_TEXT":
      // Don't add to history if text is already empty
      if (state.text === "") {
        return state;
      }

      return {
        ...state,
        text: "",
        history: [...state.history, state.text],
      };

    case "UNDO_TEXT": {
      if (state.history.length === 0) return state;

      const previousText = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);

      return {
        ...state,
        text: previousText,
        history: newHistory,
      };
    }

    case "RESET_TEXT":
      // Don't add to history if text is already the initial text
      if (state.text === state.initialText) {
        return state;
      }

      return {
        ...state,
        text: state.initialText,
        history: [...state.history, state.text],
      };

    default:
      return state;
  }
}

export function TextProvider({
  children,
  initialText = "Default text",
}: TextProviderProps) {
  const [state, dispatch] = useReducer(textReducer, {
    text: initialText,
    history: [],
    initialText,
  });

  // Action creators
  const updateText = (newText: string) => {
    dispatch({ type: "UPDATE_TEXT", payload: newText });
  };

  const clearText = () => {
    dispatch({ type: "CLEAR_TEXT" });
  };

  const undoText = () => {
    dispatch({ type: "UNDO_TEXT" });
  };

  const resetText = () => {
    dispatch({ type: "RESET_TEXT" });
  };

  return (
    <TextContext.Provider
      value={{
        text: state.text,
        history: state.history,
        updateText,
        clearText,
        undoText,
        resetText,
      }}
    >
      {children}
    </TextContext.Provider>
  );
}
