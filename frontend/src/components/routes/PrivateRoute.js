import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
	// Get auth state from redux
	const { loading, user, isAuthentificated } = useSelector(
		(state) => state.user.auth
	);

	const isAuth = sessionStorage.getItem("isAuthentificated");

	if (loading === false) {
		if (isAuth) {
			if (user) {
				if (!isAuthentificated || user.role === "user") {
					return <Outlet />;
				}
				if (!isAuthentificated || user.role === "admin") {
					return <Outlet />;
				}
			}
		} else {
			return <Navigate to="" />;
		}
	}
};
export default PrivateRoute;
