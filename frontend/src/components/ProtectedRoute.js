import React from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ProtectedRoute = ({ children }) => {
  // Check if there's a Supabase session
  const session = supabase.auth.session();

  // If no session exists, redirect to login page
  if (!session) {
    return <Navigate to="/login" />;
  }

  // If session exists, render the children components (protected content)
  return children;
};

export default ProtectedRoute;
