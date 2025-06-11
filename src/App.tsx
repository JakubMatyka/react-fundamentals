import "./App.css";
import { TextInputForm } from "./components/TextInputForm";
import { TextDisplay } from "./components/TextDisplay";
import { TextControls } from "./components/TextControls";
import { TextProvider } from "./contexts/text";

function App() {
  return (
    <TextProvider initialText="Welcome to React Fundamentals!">
      <div className="app">
        <header className="app-header">
          <h1>React Fundamentals</h1>
          <p className="deployment-info">
            🚀 Auto-deployed via Coolify - updated! 🎉
          </p>
        </header>
        <main className="app-main">
          <TextDisplay />
          <TextInputForm />
          <TextControls />
        </main>
      </div>
    </TextProvider>
  );
}

export default App;
