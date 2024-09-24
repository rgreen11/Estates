import { Link } from "react-router-dom";

const IntroPage = () => {
  return (
    <div>
      <Link to="/auth">SignIn/Login</Link>
      <h1>Welcome! Open House forms for realtors</h1>
    </div>
  );
};

export default IntroPage;
