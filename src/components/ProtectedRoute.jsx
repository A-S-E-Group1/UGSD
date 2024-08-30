import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import Loading from "./loading/loading";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useGlobalContext();

  // Display loading screen while Firebase is checking authentication status
  if (isLoading) {
    return <Loading />;
  }

  // If the user is authenticated, render the children (protected content)
  if (user) {
    return <>{children}</>;
  } else {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
