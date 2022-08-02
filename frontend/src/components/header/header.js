import "./styles.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

export const Header = () => {
  const [click, setClick] = useState(false);
  const [logged, setLogged] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await authService.logout();
    window.location.reload(true);
    navigate("/");
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setLogged(true);
    }
  });

  return (
    <div className="header">
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact="true" to="/" className="nav-logo">
            HouseHunters
            <i className="fa fa-code"></i>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/houses"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Properties
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/portal/post-house"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Sellers
              </NavLink>
            </li>
            {logged ? (
              <li className="nav-item">
                <NavLink
                  exact="true"
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={logoutUser}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  exact="true"
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
};
