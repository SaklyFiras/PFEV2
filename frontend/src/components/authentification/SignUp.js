import React, { useState, useEffect } from "react";
import dentists from "../../images/dentists.jpg";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../redux/reducers/userReducers";
import MetaData from "../layout/metaData";
const SignUp = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("Student");
	const [birthDate, setBirthDate] = useState("");
	const dispatch = useDispatch();

	const { error, loading, message } = useSelector(
		(state) => state.user.register
	);

	useEffect(() => {
		if (error !== "Login first to access this resource.") {
			error && toast.error(error, { position: toast.POSITION.TOP_CENTER });
		}
		message &&
			toast.success("Register success,Check ur inbox", {
				position: toast.POSITION.TOP_CENTER,
			});
	}, [dispatch, error, message]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set("name", fullName);
		formData.set("email", email);
		formData.set("password", password);
		formData.set("status", status);
		formData.set("birthDate", birthDate);
		dispatch(registerUser(formData));
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
			<ToastContainer />
			<MetaData title="Sign up" />
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

						<form
							onSubmit={handleSubmit}
							className="vstack gap-3"
							
						>
							<input
								type="text"
								className="form-control w-75 mx-auto"
								placeholder="Name"
								onChange={(e) => setFullName(e.target.value)}
								required
							/>
							<input
								type="email"
								className="form-control w-75 mx-auto"
								placeholder="Email address"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<input
								type="password"
								className="form-control w-75 mx-auto"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<select
								className="form-select w-75 mx-auto"
								aria-label="Default select example"
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="Student">Student</option>
								<option value="Prefessor">Professor</option>
								<option value="Expert">Expert</option>
								<option value="Dentist">Dentist</option>
							</select>

							<input
								type="date"
								className="form-control  w-75 mx-auto"
								min="1940-01-01"
								max="2022-12-31"
								onChange={(e) => setBirthDate(e.target.value)}
								required
							/>
							<button
								disabled={loading ? true : false}
								type="submit"
								className="btn btn-outline-primary px-5 mx-auto mt-5"
							>
								Sign Up
							</button>
						</form>
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

export default SignUp;
