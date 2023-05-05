import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, isAdmin }) => {
	// Get auth state from redux
	const { loading, user } = useSelector((state) => state.user.auth);

	const isAuth = sessionStorage.getItem("isAuthentificated");

	if (loading === false) {
		if (isAuth && user) {
			if (user.role !== "admin" && isAdmin) {
				return <h1>Restricted area</h1>;
			}

			return children;
		} else {
			return <Navigate to="" />;
		}
	}
};
export default PrivateRoute;
