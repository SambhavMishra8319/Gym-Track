import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ user, children }) {
  // If already logged in → go home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Else → show login/signup page
  return children;
}
