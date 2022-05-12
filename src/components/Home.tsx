import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/FirebaseContext";

function Home() {
  const { currentUser } = useAuth();

  return (
    <div
      className="hero is-fullheight"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="subtitle">Hello, {currentUser?.email}</h1>
      <h1 className="title">Welcome to MySnips</h1>
    </div>
  );
}

export default Home;
