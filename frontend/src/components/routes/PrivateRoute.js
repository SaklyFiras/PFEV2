import { useSelector } from "react-redux";

const PrivateRoute = ({ children, isAdmin }) => {
	// Get auth state from redux
	const { loading, user } = useSelector((state) => state.user.auth);

	const isAuth = sessionStorage.getItem("isAuthentificated");

	if (loading === false) {
		if (isAuth) {
			if (user) {
				if (user.role !== "admin" && isAdmin) {
					return window.history.back();
				}

				return children;
			}
		} else {
			window.history.back();
		}
	}
};
export default PrivateRoute;
