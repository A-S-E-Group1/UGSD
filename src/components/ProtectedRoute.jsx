import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import Loading from "./loading/loading";

function ProtectedRoute({ children }) {
	const { user, isLoading } = useGlobalContext();
	if (isLoading) {
		return <Loading />;
	}
	if (user) {
		return <>{children}</>;
	} else {
		return <Navigate to="/login" />;
	}
	// return
}

export default ProtectedRoute;
