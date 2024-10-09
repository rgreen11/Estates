import { NavLink } from "react-router-dom";
import "./style/Header.css";
import { getCookie } from "../Authentication/Cookies";

const Header = () => {
  const authCookie = getCookie("RichAuth");
  return (
    <header className="header">
      <nav className="nav">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink
          to="/view-my-clients"
          className="nav-link"
          activeClassName="active"
        >
          See Clients
        </NavLink>
        <NavLink to="/form" className="nav-link" activeClassName="active">
          Create an Open House Form
        </NavLink>
        {authCookie ? (
          <NavLink to="" className="nav-link" activeClassName="active">
            Sign out
          </NavLink>
        ) : (
          <NavLink to="/auth" className="nav-link" activeClassName="active">
            Sign up/Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
