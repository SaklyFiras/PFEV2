import React, { useState, useEffect } from "react";
import dentists from "../../images/dentists.jpg";
import logo from "../../images/logo.png";
import { forgotPassword } from "../../redux/reducers/forgotPasswordReducer";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/metaData";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const { error, message, success } = useSelector(
		(state) => state.forgotPassword
	);
	useEffect(() => {
		error && toast.error(error, { position: toast.POSITION.TOP_CENTER });
		success && toast.success(message, { position: toast.POSITION.TOP_CENTER });
	}, [dispatch, error, message, success]);

	const handleForgotPassword = async (event) => {
		event.preventDefault();
		dispatch(forgotPassword({ email: email }));
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
			<MetaData title="Password Recovery" />
			
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
							<h6 className="text-center text-secondary px-5">
								enter your email adress, an email will be sent to this adress to
								reset your password
							</h6>
							<input
								type="email"
								className="form-control w-75 mx-auto mb-2"
								placeholder="Email address"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
							<button
								onClick={handleForgotPassword}
								className="btn btn-outline-primary mx-auto mb-2"
							>
								Reset Password
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

export default ForgetPassword;
