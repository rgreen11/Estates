import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/Welcome/Welcome.jsx";
import LoggedIn from "./components/LoggedIn/LoggedIn.jsx";
import Form from "./components/OpenHouseForm/Form.tsx";
import ViewMyClients from "./components/ViewClients/ViewMyClients.jsx";
import AuthenticationForm from "./components/Authentication/AuthenticationForm.tsx";
import AuthProvider from "./components/Authentication/AuthProvider.jsx";
import ProtectedRoute from "./components/Authentication/ProtectedAuth.jsx";
import ProtectedLoginRoute from "./components/Authentication/ProtectedLoginRoute.jsx";
import Header from "./components/Header/Header.jsx"

function App() {
  // have a use state
  // pass it to form
  // when form returns a success
  // render another component to show success for a short time
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <div className="App">
          <div className="container">
            {/* sign in || create account */}
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route
                path="/auth"
                element={
                  <ProtectedLoginRoute>
                    <AuthenticationForm />
                  </ProtectedLoginRoute>
                }
              />
              {/* Access this when sessions Token is received */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <LoggedIn />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/form"
                element={
                  <ProtectedRoute>
                    <Form />
                  </ProtectedRoute>
                }
              />

              <Route
                path="view-my-clients"
                element={
                  <ProtectedRoute>
                    <ViewMyClients />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// Integrate AI
// https://aws.amazon.com/ai/generative-ai/
