import { useSelector } from "react-redux";

const PrivateRoute = ({ children, isAdmin }) => {
	// Get auth state from redux
	const { loading, user } = useSelector((state) => state.user.auth);
	

	const isAuth = sessionStorage.getItem("isAuthentificated");

	if (!loading) {
		if (!isAuth) {
			window.location.href = "/";
		}
		if (user) {
			if (user.role !== "admin" && isAdmin) {
				return window.history.back();
			}
			return children;
		}
	}
};
export default PrivateRoute;
