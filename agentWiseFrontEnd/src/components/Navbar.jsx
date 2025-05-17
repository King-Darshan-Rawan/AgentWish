import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can clear localStorage/token here if you're using auth
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          LOGO
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {location.pathname === "/" && (
              <Link to="/signup" className="btn btn-outline-primary">
                Sign Up
              </Link>
            )}

            {location.pathname === "/signup" && (
              <Link to="/" className="btn btn-outline-secondary">
                Login
              </Link>
            )}

            {location.pathname === "/dashboard" && (
              <>
                <Link to="/add-agent" className="btn btn-primary">
                  Add Agent
                </Link>
                <Link to="/assign-tasks" className="btn btn-secondary">
                  Assign Task
                </Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
