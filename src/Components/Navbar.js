import React from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import mode from "../image/dark-mode.png";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  // let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { handleDarkModeToggle, darkMode } = props;
  console.log(darkMode);

  return (
    <>
      {/* <nav
        className={`navbar py-3 navbar-expand-lg bg-body-tertiary   ${
        } `}
      >
        <div className="container-fluid" style={{ width: "95%" }}>
          <Link
            className={`navbar-brand ${darkMode ? "text-white" : "text-black"}`}
            to="/"
          >
            <img className="px-1" src={logo} alt="logo" width="50px" />
            <span className={`ms-2  ${darkMode ? "text-white" : "text-black"}`}>Notionx</span>
          </Link>
          <div>
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-2-outlined"
              autoComplete="off"
              onClick={handleDarkModeToggle}
            />
            <label
              className="btn btn-outline-secondary"
              htmlFor="btn-check-2-outlined"
            >
              <img src={mode} alt="darkmode" />
            </label>
            <br></br>
          </div>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav> */}

      <nav className={`navbar navbar-expand-lg navbar-light bg-light ${darkMode ? 'dark-Mode' : 'Light-Mode'}`}>
        {/* Container wrapper */}
        <div className="container-fluid" style={{ width: "95%" }}>
          {/* Navbar brand */}
          <Link
            className={`navbar-brand ${darkMode ? "text-white" : "text-black"}`}
            to="/"
          >
            <img className="px-1" src={logo} alt="logo" width="50px" />
            <span className={`ms-2  ${darkMode ? "text-white" : "text-black"}`}>
              Notionx
            </span>
          </Link>

          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
            </ul>
            {/* Left links */}

            <div className="d-flex align-items-center ">
              {!localStorage.getItem("token") ? (
                <form className="d-flex ">
                  <Link
                    className="btn btn-primary mx-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/signup"
                    role="button"
                  >
                    Signup
                  </Link>
                </form>
              ) : (
                <button className="btn btn-primary " onClick={handleLogout}>
                  Logout
                </button>
              )}
              <div className="ms-3">
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btn-check-2-outlined"
                  autoComplete="off"
                  onClick={handleDarkModeToggle}
                />
                <label
                  className="btn btn-outline-secondary"
                  htmlFor="btn-check-2-outlined"
                >
                  <img src={mode} alt="darkmode" />
                </label>
                <br></br>
              </div>
            </div>
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
    </>
  );
};

export default Navbar;
