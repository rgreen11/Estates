import "./App.css";
import Form from "./components/Form.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Getting started</p>
        <Form
          title={"Learn React"}
        />
      </header>
    </div>
  );
}

export default App;
