import { NavLink } from "react-router-dom";
import "./style/Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/auth" className="nav-link" activeClassName="active">
          Sign In/Login
        </NavLink>
        <NavLink to="/view-my-clients" className="nav-link" activeClassName="active">
          See Clients
        </NavLink>
        <NavLink to="/form" className="nav-link" activeClassName="active">
          Create an Open House Form
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
