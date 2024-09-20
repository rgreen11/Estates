import "./App.css";
import Form from "./components/Form.tsx";
import AuthenticationForm from "./components/Authentication/AuthenticationForm.tsx";

function App() {
  // have a use state
  // pass it to form
  // when form returns a success
  // render another component to show success for a short time
  return (
    <div className="App">
      <div className="container">
        {/* sign in || create account */}
        <AuthenticationForm />
        {/* create open house form */}
        {/* <Form title={"Learn React"} /> */}
      </div>
    </div>
  );
}

export default App;



// Integrate AI
// https://aws.amazon.com/ai/generative-ai/