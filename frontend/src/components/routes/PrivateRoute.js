import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
	// Get auth state from redux
	const { loading } = useSelector((state) => state.user.auth);

	const user = JSON.parse(sessionStorage.getItem("user"))

	if (loading === false) {
		if (!user) {
			return <Navigate to="" />;
		}
		if (user.role === "user") {
			return <Outlet />;
		}
		if (user.role === "admin") {
			return <Outlet />;
		}
	}
};
export default PrivateRoute;
