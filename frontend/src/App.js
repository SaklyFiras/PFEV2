import VerifyEmail from "./components/authentification/VerifyEmail";

import FormPost from "./components/Formu&Nav/FormPost";
import UserProfileDetails from "./components/user/userProfileDetails";
import UserProfile from "./components/user/userProfile";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/reducers/userReducers";
import { Route, Routes } from "react-router-dom";
import Login from "./components/authentification/Login";
import SignUp from "./components/authentification/SignUp";
import ForgetPassword from "./components/authentification/ForgetPassword";
import ResetPassword from "./components/authentification/ResetPassword";
import DashBoard from "./components/admin/DashBoard";
import UsersList from "./components/admin/UsersList";
import PostsList from "./components/admin/PostsList";

import FeedPage from "./components/profile/FeedPage";
import { ToastContainer } from "react-toastify";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route
					path="/accueil"
					element={
						<PrivateRoute>
							<FeedPage />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/:id"
					element={
						<PrivateRoute>
							<UserProfile />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/me"
					element={
						<PrivateRoute>
							<UserProfileDetails />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/post/:id"
					element={
						<PrivateRoute>
							<FeedPage />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/post/add"
					element={
						<PrivateRoute>
							<FormPost />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/post/update/:id"
					element={
						<PrivateRoute>
							<FormPost />
						</PrivateRoute>
					}
				></Route>

				<Route
					path="/admin/dashboard"
					element={
						<PrivateRoute isAdmin={true}>
							<DashBoard />
						</PrivateRoute>
					}
				></Route>

				<Route
					path="/admin/users"
					element={
						<PrivateRoute isAdmin={true}>
							<UsersList />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/admin/posts"
					element={
						<PrivateRoute isAdmin={true}>
							<PostsList />
						</PrivateRoute>
					}
				></Route>

				<Route path="/Signin" element={<SignUp />}></Route>
				<Route path="/:id/verify/:token" element={<VerifyEmail />}></Route>
				<Route index element={<Login />} exact></Route>
				<Route path="/password/reset" element={<ForgetPassword />}></Route>
				<Route
					path="/password/reset/:token"
					element={<ResetPassword />}
				></Route>

				<Route path="*" element={<h1>404 Not Found</h1>}></Route>

				<Route path="/homepage" element={<FeedPage />}></Route>
				
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
