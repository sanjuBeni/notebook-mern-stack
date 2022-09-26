import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  // console.log(location);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Notebook App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  } `}
                  to="about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              {location.pathname === "/signup" && (
                <Link
                  className="btn btn-primary btn-sm mx-1"
                  role="button"
                  to="/login"
                >
                  Login
                </Link>
              )}
              {location.pathname === "/login" && (
                <Link
                  className="btn btn-primary btn-sm mx-1"
                  role="button"
                  to="/signup"
                >
                  Signup
                </Link>
              )}
              {localStorage.getItem("token") && (
                <button
                  className="btn btn-primary btn-sm mx-1"
                  role="button"
                  onClick={logout}
                >
                  Logout
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
