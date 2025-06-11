import "./App.css";
import { StatefulForm } from "./components/FormAction";
import { MemoAction } from "./components/MemoAciton";
import { RandomComponent } from "./components/RandomComponent";
import { TextInputForm } from "./components/TextInputForm";
import { TextDisplay } from "./components/TextDisplay";
import { TextControls } from "./components/TextControls";
import { TextProvider } from "./contexts/text";

function App() {
  return (
    <TextProvider initialText="Welcome to useReducer demo!">
      <TextInputForm />
      <hr />
      <TextControls />
      <hr />
      <RandomComponent />
      <hr />
      <TextDisplay />
      <hr />
      <StatefulForm />
      <hr />
      <MemoAction />
    </TextProvider>
  );
}

export default App;
