import React, { useState, useEffect } from "react";
import dentists from "../../images/dentists.jpg";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearErrors } from "../../redux/reducers/userReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/metaData";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
	const [loginIsDisabled, setLoginState] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error } = useSelector((state) => state.user.auth);
	const { loading } = useSelector((state) => state.user.auth);
	const { emailSend } = useSelector((state) => state.user.register);
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			dispatch(handleLogin());
		}
	};

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
		return () => {
			dispatch(clearErrors());
		};
	}, [isAuth, error, emailSend]);

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
	const onCaptchaChange = (value) => {
		value ? setLoginState(false) : setLoginState(true);
	};

	return (
		<>
			<MetaData title="Welcome" />

			<div className="container-sm w-75 mt-4  shadow ">
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
							<form onSubmit={handleLogin} className="vstack overflow-auto gap-3">
								<input
									autoComplete="email"
									type="email"
									className="form-control w-75 mx-auto "
									placeholder="Email address"
									value={username}
									onChange={(event) => setUsername(event.target.value)}
									required
									onKeyDown={handleKeyPress}
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
									onKeyDown={handleKeyPress}
								/>
								<ReCAPTCHA
								className="
								row mx-auto overflow-auto"
									sitekey="6LcZuc4pAAAAAGqcbE91lV8_bwqctvzKfqVfXkiZ"
									onChange={onCaptchaChange}
								/>
								
								<button
									type="submit"
									className="btn btn-outline-primary px-5 mx-auto rounded-4"
									disabled={loading || loginIsDisabled}
								>
									{loading ? (
										<div className="spinner-border" role="status"></div>
									) : (
										"Login"
									)}
								</button>
							</form>
							<Link
								to="/password/reset"
								className="text-center text-primary mx-5 opacity-75"
							>
								Forgot Password ?
							</Link>

							<hr className="w-50 m-auto" />
							<h5 className=" text-center text-secondary opacity-50">-OR-</h5>
							<Link
								to="/Signin"
								className="btn btn-outline-primary px-5 mx-auto rounded-4"
							>
								Sign up
							</Link>
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
					<Link to="/aboutUs" className="text-center text-secondary mx-5">
						About Us
					</Link>
					<Link to="/privacyPolicy" className="text-center text-secondary mx-5">
						Privacy Policy
					</Link>
					<Link
						to="/termsOfService"
						className="text-center text-secondary mx-5"
					>
						Terms of Service
					</Link>
				</div>
				<div className="text-center text-secondary ">Copyrights © 2023</div>
			</div>
		</>
	);
};

export default Login;
