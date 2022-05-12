import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FirebaseContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";

function Register() {
  const [viewPassword1, setViewPassword1] = useState(false);
  const [viewPassword2, setViewPassword2] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const onInputChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { email, password, cpassword } = state;

  async function handleRegister() {
    if (password !== cpassword) {
      return setError("Passwords do not match");
    }
    if (password.length < 6) {
      return setError("Passwords must be 6 characters long!");
    }

    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/login");
      });
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use !");
          break;
        case "auth/invalid-password":
          setError("Password Incorrect! It must be 6 character long minimum");
          break;
        case "auth/invalid-email":
          setError(
            "The provided value for the email user property is invalid!"
          );
          break;
        default:
          setError("Cannot create account!");
      }
    }

    setLoading(false);
  }

  return (
    <div>
      <div
        style={{
          marginTop: 50,
          marginRight: "25%",
          marginLeft: "25%",
          marginBottom: "25%",
          padding: 35,
          border: "1px solid #ccc",
          borderRadius: 20,
        }}
      >
        <div className="title">Register A User</div>

        <form>
          <>
            <div className="field">
              <label className="label">
                Email <span style={{ color: "red" }}>*</span>{" "}
              </label>
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  required
                />
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
                  type={viewPassword1 ? "text" : "password"}
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
                    color: viewPassword1 ? "black" : "#7774",
                  }}
                  onClick={() => setViewPassword1(!viewPassword1)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </i>
              </p>
              <p className="help">
                Password should be 6 characters long minimum
              </p>
            </div>
            <div className="field">
              <label className="label">
                Confrim Password <span style={{ color: "red" }}>*</span>
              </label>
              <p className="control has-icons-left has-icons-right">
                <input
                  required
                  className="input"
                  type={viewPassword2 ? "text" : "password"}
                  placeholder="Confrim Password"
                  name="cpassword"
                  value={cpassword}
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
                    color: viewPassword2 ? "black" : "#7774",
                  }}
                  onClick={() => setViewPassword2(!viewPassword2)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </i>
              </p>
            </div>
            <div className="block" />

            <div className="block" />
          </>
        </form>

        <div className="field" style={{ marginTop: 15 }}>
          <p className="control">
            <span className="block" style={{ alignSelf: "flex-end" }}>
              Already have an account?{" "}
              <Link to={{ pathname: "/login" }}>Login </Link>
            </span>
            instead.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 5,
          }}
        >
          <button
            onClick={handleRegister}
            style={{ marginLeft: 5 }}
            className="button is-info"
          >
            Register
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

export default Register;
