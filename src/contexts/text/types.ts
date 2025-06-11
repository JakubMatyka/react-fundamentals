export interface TextContextType {
  text: string;
  history: string[];
  updateText: (newText: string) => void;
  clearText: () => void;
  undoText: () => void;
  resetText: () => void;
}

export interface TextProviderProps {
  children: React.ReactNode;
  initialText?: string;
}

export interface TextState {
  text: string;
  history: string[];
  initialText: string;
}

export type TextAction =
  | { type: "UPDATE_TEXT"; payload: string }
  | { type: "CLEAR_TEXT" }
  | { type: "UNDO_TEXT" }
  | { type: "RESET_TEXT" };
