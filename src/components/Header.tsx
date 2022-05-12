import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FirebaseContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Header() {
  const [userData, setUserData] = useState([]);
  const { currentUser, logout } = useAuth();

  let navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("Failed to log out");
    }
  }

  return (
    <nav
      className="navbar has-shadow py-3 is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a style={{ marginLeft: 15 }} className="navbar-item" href="/">
          <strong style={{ fontWeight: "700", fontSize: 24 }}>My Snips</strong>
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        {currentUser && (
          <div className="navbar-start">
            <Link to={{ pathname: "/" }} className="navbar-item">
              Home
            </Link>

            <Link to={{ pathname: "/snippets" }} className="navbar-item">
              Snippets
            </Link>
          </div>
        )}

        <div className="navbar-end">
          <div className="navbar-item">
            {currentUser ? (
              <>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a
                    className="navbar-link"
                    style={{
                      color: "white",
                      marginRight: 35,
                      fontWeight: "bold",
                    }}
                  >
                    {currentUser?.email}
                  </a>

                  <div className="navbar-dropdown">
                    <span className="navbar-item">{currentUser?.email}</span>
                    <hr className="navbar-divider" />
                  </div>
                </div>
                <button
                  className="button is-info is-light is-small"
                  onClick={handleLogout}
                >
                  <strong>Log Out</strong>
                </button>
              </>
            ) : (
              <div className="buttons">
                <Link
                  to={{ pathname: "/register" }}
                  className="button is-info is-light"
                >
                  <strong>Register</strong>
                </Link>
                <Link
                  to={{ pathname: "/login" }}
                  className="button is-info is-light"
                >
                  <strong>Log in</strong>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
