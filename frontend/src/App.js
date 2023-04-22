import VerifyEmail from "./components/authentification/VerifyEmail";

import FormPost from "./components/Formu&Nav/FormPost";
import UserProfileDetails from "./components/user/userProfileDetails";
import UserProfile from "./components/user/userProfile";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/reducers/userReducers";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Formu&Nav/Nav";
import Login from "./components/authentification/Login";
import SignUp from "./components/authentification/SignUp";
import ForgetPassword from "./components/authentification/ForgetPassword";
import ResetPassword from "./components/authentification/ResetPassword";
import DashBoard from "./components/admin/DashBoard";
import UsersList from "./components/admin/UsersList";
import PostsList from "./components/admin/PostsList";

import FeedPage from "./components/profile/FeedPage";

function App() {
	const dispatch = useDispatch();
	

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return (
		<Routes>
			<Route element={<PrivateRoute />}>
				<Route path="/:id" element={<UserProfile />} />
				<Route path="/me" element={<UserProfileDetails />} />
				<Route path="/accueil" element={<FeedPage />} />
				<Route path="/post/:id" element={<FeedPage/>} />
			</Route>

			 <Route element={<PrivateRoute />}>
				<Route path="/admin/dashboard" element={<DashBoard />}  />
				<Route path="/admin/users" element={<UsersList />}  />
				<Route path="/admin/posts" element={<PostsList />}  />
				<Route path="/accueil" element={<FeedPage />} />
				<Route path="/post/:id" element={<FeedPage/>} />
				<Route path="/addpost" element={<FormPost />} />
			</Route> 

			<Route path="/Signin" element={<SignUp />}></Route>
			<Route path="/:id/verify/:token" element={<VerifyEmail />}></Route>
			<Route index element={<Login />} exact></Route>
			<Route path="/password/reset" element={<ForgetPassword />}></Route>
			<Route path="/password/reset/:token" element={<ResetPassword />}></Route>

			<Route path="*" element={<h1>404 Not Found</h1>}></Route>

			<Route path="/homepage" element={<FeedPage />}></Route>
			<Route path="/addpost" element={<FormPost />}></Route>
		</Routes>
	);
}

export default App;
