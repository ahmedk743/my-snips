import { faEnvelope, faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FirebaseContext";

function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });

  const { email, password } = state;

  const { login, currentUser, forgotPassword } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();
    if (password.length < 6) {
      return setError("Passwords must be 6 characters long!");
    }
    setError("");
    setLoading(true);
    try {
      await login(email, password).then(() => {
        navigate("/");
      });
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found!");
          break;
        case "auth/wrong-password":
          setError("Provided password is wrong");
          break;
        default:
      }
    }
    setLoading(false);
  }

  const onInputChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        marginTop: 50,
        marginRight: "25%",
        marginLeft: "25%",
        padding: 35,
        marginBottom: "25%",
        border: "1px solid #ccc",
        borderRadius: 20,
      }}
    >
      <div className="title">Login</div>

      {error.length > 0 && (
        <div className="notification is-danger is-light">{error}</div>
      )}

      <div className="field">
        <label className="label">
          Email <span style={{ color: "red" }}>*</span>{" "}
        </label>
        <p className="control has-icons-left">
          <input
            required
            className="input"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </p>
      </div>
      <div className="field">
        <label className="label">
          Password <span style={{ color: "red" }}>*</span>
        </label>
        <p className="control has-icons-left has-icons-right">
          <input
            required
            className="input"
            type={viewPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <i
            style={{
              position: "absolute",
              top: 7,
              right: 10,
              color: viewPassword ? "black" : "#7774",
            }}
            onClick={() => setViewPassword(!viewPassword)}
          >
            <FontAwesomeIcon icon={faEye} />
          </i>
        </p>
      </div>

      <div className="field" style={{ marginTop: 10 }}>
        <p className="control">
          <span className="block" style={{ alignSelf: "flex-end" }}>
            Don't have an account?{" "}
            <Link to={{ pathname: "/register" }}>Register!</Link>
          </span>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <button
          disabled={loading}
          onClick={handleLogin}
          className="button is-info"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
