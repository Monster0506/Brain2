// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ProtectedRoute = ({ children }) => {
  const session = supabase.auth.session();
  return session ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
