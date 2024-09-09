import "./App.css";
import Form from "./components/Form.tsx";
import CreateAccount from "./components/CreateAccount.tsx";

function App() {
  // have a use state
  // pass it to form
  // when form returns a success
  // render another component to show success for a short time
  return (
    <div className="App">
      <div className="container">
        {/* sign in || create account */}
        <CreateAccount />
        {/* create open house form */}
        {/* <Form title={"Learn React"} /> */}
      </div>
    </div>
  );
}

export default App;
