import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);
  const [navbarVisible, setNavbarVisible] = useState(false); // State to manage navbar visibility

  useEffect(() => {
    setLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <header>
      <div className="header-container">
        <h1>Music App</h1>
        <div
          className={`menu-button ${navbarVisible ? "active" : ""}`}
          onClick={toggleNavbar}
        >
          <span className="menu-text">Menu</span>
        </div>
        <nav className={`navbar ${navbarVisible ? "visible" : ""}`}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/song-catalog"}>Catalogue</Link>
            </li>
            {loggedIn && (
              <>
                <li>
                  <Link to={"/album-add"}>Add album</Link>
                </li>
                <li>
                  <Link to={"/song-add"}>Add song</Link>
                </li>
                <li>
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li>
                  <Link to={"/logout"}>Logout</Link>
                </li>
              </>
            )}
            {!loggedIn && (
              <>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contact</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
