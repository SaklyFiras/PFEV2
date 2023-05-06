import React, { useState, useEffect } from "react";
import dentists from "../../images/dentists.jpg";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/reducers/userReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/metaData";
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error } = useSelector((state) => state.user.auth);
	const { loading } = useSelector((state) => state.user.auth);
	const { emailSend } = useSelector((state) => state.user.register);

	const isAuth = sessionStorage.getItem("isAuthentificated");

	useEffect(() => {
		if (error !== "Login first to access this resource.") {
			error && toast.error(error, { position: toast.POSITION.TOP_CENTER });
		}
		emailSend &&
			toast.success("Check your inbox", {
				position: toast.POSITION.TOP_CENTER,
			});
		isAuth && navigate("/accueil");
	}, [isAuth, error, emailSend, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginUser({ email: username, password: password }));
	};

	const [windowSize, setWindowSize] = useState([
		window.innerWidth,
		window.innerHeight,
	]);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	});

	return (
		<>
			<MetaData title="Welcome" />

			<div className="container-sm mt-5  shadow w-75">
				<div className="row">
					<div className="col-md-6 ">
						<div className="mt-4 d-flex justify-content-center">
							<img
								style={{ height: "80px" }}
								alt="desntist"
								src={logo}
								className="img-fluid"
							/>
						</div>
						<div className="vstack gap-3">
							<h4
								style={{
									color: "rgb(69, 146, 234)",
									fontFamily: "'Cabin', sans-serif",
									fontSize: " 30px",
									letterSpacing: "2px",
								}}
								className="mb-5 text-center"
							>
								login
							</h4>
							<form onSubmit={handleLogin} className="vstack gap-3">
								<input
									autoComplete="email"
									type="email"
									className="form-control w-75 mx-auto "
									placeholder="Email address"
									value={username}
									onChange={(event) => setUsername(event.target.value)}
									required
								/>

								<input
									type="password"
									autoComplete="current-password"
									className="form-control w-75 mx-auto "
									id="floatingPassword"
									placeholder="Password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
								/>
								<button
									onClick={() => navigate("password/reset")}
									className="btn btn-link mx-auto "
								>
									Forgot password ? click here
								</button>
								<button
									type="submit"
									className="btn btn-outline-primary px-5 mx-auto rounded-4"
									disabled={loading}
								>
									login
								</button>
							</form>

							<h4 className=" text-center text-secondary">-OR-</h4>
							<button
								onClick={() => navigate("/Signin")}
								className="btn btn-outline-primary px-5  mx-auto rounded-4"
							>
								Sign Up
							</button>
						</div>
					</div>

					{windowSize[0] <= 767 ? null : (
						<img
							alt="desntist"
							src={dentists}
							className="img-fluid rounded-end col-md-6 p-0 m-0"
						/>
					)}
				</div>
			</div>
			<div className="row d-flex justify-content-center">
				<div className="col mt-3 d-flex justify-content-center">
					<a href="?" className="text-center text-secondary mx-5">
						About Us
					</a>
					<a href="?" className="text-center text-secondary mx-5">
						Privacy Policy
					</a>
					<a href="?" className="text-center text-secondary mx-5">
						Terms of Service
					</a>
				</div>
				<div className="text-center text-secondary ">Copyrights © 2023</div>
			</div>
		</>
	);
};

export default Login;
