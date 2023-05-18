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
import AboutUs from "./components/authentification/AboutUs";
import TermsOfService from "./components/authentification/TermsOfService";
import PrivacyPolicy from "./components/authentification/PrivacyPolicy";
import GroupsWelcomePage from "./components/user/Groups/GroupsWelcomePage";

import FeedPage from "./components/profile/FeedPage";
import { ToastContainer } from "react-toastify";
import GroupsCreatePage from "./components/user/Groups/GroupsCreatePage";
import GroupHomePage from "./components/user/Groups/GroupHomePage";
import GroupsList from "./components/admin/GroupsList";

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
					exact
					element={
						<PrivateRoute>
							<FeedPage />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/:user_id"
					exact
					element={
						<PrivateRoute>
							<UserProfile />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/me"
					exact
					element={
						<PrivateRoute>
							<UserProfileDetails />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/groups"
					exact
					element={
						<PrivateRoute>
							<GroupsWelcomePage />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/groups/create"
					exact
					element={
						<PrivateRoute>
							<GroupsCreatePage />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/groups/:group_id"
					exact
					element={
						<PrivateRoute>
							<GroupHomePage />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/post/:id"
					exact
					element={
						<PrivateRoute>
							<FeedPage />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/post/add"
					exact
					element={
						<PrivateRoute>
							<FormPost />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/post/update/:id"
					exact
					element={
						<PrivateRoute>
							<FormPost />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/post/add/group/:group_id"
					exact
					element={
						<PrivateRoute>
							<FormPost />
						</PrivateRoute>
					}
				></Route>

				<Route
					path="/admin/dashboard"
					exact
					element={
						<PrivateRoute isAdmin={true}>
							<DashBoard />
						</PrivateRoute>
					}
				></Route>

				<Route
					path="/admin/users"
					exact
					element={
						<PrivateRoute isAdmin={true}>
							<UsersList />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/admin/posts"
					exact
					element={
						<PrivateRoute isAdmin={true}>
							<PostsList />
						</PrivateRoute>
					}
				></Route>
				<Route
					path="/admin/groups"
					exact
					element={
						<PrivateRoute isAdmin={true}>
							<GroupsList />
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
				<Route path="/aboutUs" element={<AboutUs />}></Route>
				<Route path="/termsOfService" element={<TermsOfService />}></Route>
				<Route path="/privacyPolicy" element={<PrivacyPolicy />}></Route>

				<Route path="*" element={<h1>404 Not Found</h1>}></Route>
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
