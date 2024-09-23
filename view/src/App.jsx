import "./App.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/Welcome/Welcome.jsx";
import LoggedIn from "./components/LoggedIn/LoggedIn.jsx";
import Form from "./components/OpenHouseForm/Form.tsx";
import AuthenticationForm from "./components/Authentication/AuthenticationForm.tsx";

const root = createRoot(document.getElementById("root"));

function App() {
  // have a use state
  // pass it to form
  // when form returns a success
  // render another component to show success for a short time
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          {/* sign in || create account */}
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/auth" element={<AuthenticationForm />} />
            {/* Access this when sessions Token is received */}
            <Route path="/profile" element={<LoggedIn />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Integrate AI
// https://aws.amazon.com/ai/generative-ai/
