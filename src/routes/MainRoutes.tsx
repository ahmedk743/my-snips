import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Error404 from "../components/Error404";

const MainRoutes = () => {
  return (
    <Routes>
      {/** Protected Routes */}
      {/** Wrap all Route under ProtectedRoutes element */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/** Public Routes */}
      {/** Wrap all Route under PublicRoutes element */}
      <Route path="" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/** Permission denied route */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MainRoutes;
