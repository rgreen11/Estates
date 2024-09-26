import { Link } from "react-router-dom";
import "./style/Welcome.css";

const IntroPage = () => {
  return (
    <div className="container">
      <Link to="/auth" className="auth">SignIn/Login</Link>
      <div className="welcome_container">
        <h2 className="type">Welcome realtors!</h2>
      </div>
      <div>
        <h3 className="type">Powered by AI</h3>
      </div>
    </div>
  );
};

export default IntroPage;
