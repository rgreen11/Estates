import { NavLink } from "react-router-dom";
import "./style/Header.css";
import { getCookie, removeCookie } from "../Authentication/Cookies";

const Header = () => {
  const authCookie = getCookie("RichAuth");
  // some bugs
  const handleSignout = () => {
    const removeToken = async () => {
      try {
        const request = new Request("http://localhost:8080/admin/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const success = await fetch(request);
        console.log({success});
        // removeCookie("RichAuth");
      } catch (err) {
        return err;
      }
    };

    removeToken();
  };
  // some bugs
  return (
    <header className="header">
      <nav className="nav">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        {authCookie && (
          <>
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
          </>
        )}
        {authCookie ? (
          <NavLink
            to=""
            className="nav-link"
            activeClassName="active"
            onClick={handleSignout}
          >
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
