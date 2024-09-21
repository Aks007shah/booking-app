import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navabr(props) {
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("users"));

  const logout = (e) => {
    const removeUser = localStorage.removeItem("users");

    setMessage(window.alert("Logout Successfully"));
    window.location.href("/account/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <Link className="navbar-brand link-underline-primary" to="/">
            Your<span className="link-underline-primary">Book</span>{" "}
            <span className="text-danger">King!</span>
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Link
                </Link>
              </li>

              {user ? (
                <div className="ms-auto me-auto">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-danger"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hi, {user?.data?.data?.name}
                      <i class="fa-solid fa-user ms-2"></i>
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={logout}
                          className="dropdown-item"
                          to="/account/register"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Account
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/account/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/account/register">
                          Register
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navabr;
