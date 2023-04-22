import React, { useState, useEffect } from "react";
import dentists from "../../images/dentists.jpg";
import logo from "../../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../redux/reducers/forgotPasswordReducer";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/metaData";
const ResetPassword = () => {
	const param = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const dispatch = useDispatch();
	const { error, message, success } = useSelector(
		(state) => state.forgotPassword
	);

	useEffect(() => {
		error && toast.error(error, { position: toast.POSITION.TOP_CENTER });
		if (success) {
			toast.success("Password changed successfully", {
				position: toast.POSITION.TOP_CENTER,
			});
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [error, success]);

	const handleResetPassword = async () => {
		const url = `http://localhost:4000/api/v2/password/reset/${param.token}`;

		dispatch(
			resetPassword(url, {
				password: password,
				confirmPassword: confirmPassword,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleResetPassword();
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
			<MetaData title="Reset Password" />
			<ToastContainer />
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
							<h6 className="text-center text-secondary">
								Reset Your password
							</h6>
							<input
								type="password"
								className="form-control w-75 mx-auto mb-2"
								placeholder="New Password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
							<input
								type="password"
								className="form-control w-75 mx-auto mb-2"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
							/>
							<button
								onClick={handleSubmit}
								className="btn btn-outline-primary  mx-auto mb-2"
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

export default ResetPassword;
