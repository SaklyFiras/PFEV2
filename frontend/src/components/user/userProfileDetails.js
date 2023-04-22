import React, { useEffect, useState } from "react";
import Nav from "../Formu&Nav/Nav";
import ChangePhoto from "./changePhoto";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
	updateUserInfo,
	updatePassword,
	deleteUser,
	logoutUser,
} from "../../redux/reducers/userReducers";
import Loading from "../routes/loading";
import Attribute from "./attribute";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/metaData";
import axios from "axios";

export const changeToAge = (date) => {
	const today = new Date();
	const birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	if (age < 0) {
		return 0;
	}
	if (age > 100) {
		return 100;
	}
	return age;
};

export const dateFormat = (d) => {
	const date = new Date(d);
	// Use Date methods to get year, month, and day
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	// Combine year, month, and day in format yyyy-MM-DD
	return `${year}-${month}-${day}`;
};

function isValidEmail(email) {
	// regular expression pattern for email validation
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}
function isValidDate(date) {
	const minDate = new Date("01/01/1950");
	const maxDate = new Date("12/31/2022");
	const inputDate = new Date(date);

	// Check if the input date is a valid date
	if (isNaN(inputDate.getTime())) {
		return false;
	}

	// Check if the input date is between the minimum and maximum dates
	if (inputDate >= minDate && inputDate <= maxDate) {
		return true;
	} else {
		return false;
	}
}

const UserProfileDetails = () => {
	const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [modif, setModif] = useState(false);
	const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user.auth);
	const { message, newuser, success, error, loading } = useSelector(
		(state) => state.user.user
	);
	const [updatedUser, setUpdatedUser] = useState({ ...user });

	const [img, setImage] = useState();
	const [updatedPassword, setUpdatedPassword] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	useEffect(() => {
		success
			? toast.success("Profile updated successfully")
			: toast.error(error);
		message &&
			deleteBtnClicked &&
			toast.error(
				"User will be deleted in 30 days,if you want to cancel the deletion Log in again",
				{
					autoClose: false,
					hideProgressBar: true,
					position: toast.POSITION.TOP_CENTER,
					theme: "colored",
				}
			) &&
			setTimeout(() => {
				dispatch(logoutUser());
			}, 6000);
	}, [success, error, message, dispatch]);

	const handleUpdatePassword = () => {
		if (updatedPassword.newPassword !== updatedPassword.confirmPassword) {
			toast.error("Passwords don't match");
			return;
		}
		dispatch(
			updatePassword({
				oldpassword: updatedPassword.oldPassword,
				password: updatedPassword.newPassword,
			})
		);
		setUpdatedPassword({
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
	};

	const handleUpdateUser = async (e, n) => {
		if (!isValidEmail(updatedUser.email)) {
			toast.error("Invalid email");
			return;
		}
		if (!isValidDate(updatedUser.birthDate)) {
			toast.error("Invalid date");
			return;
		}
		if (n === 1) {
			await axios
				.put(
					`http://localhost:4000/api/v2/me/update`,
					{ avatar: img },
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
						withCredentials: true,
					}
				)
				.then((res) => {
					console.log(res.data);
					toast.success("Avatar updated successfully");
				})
				.catch((err) => {
					console.log(err);
					toast.error("Error while updating avatar");
				});
			setIsUpdatingAvatar(false);
			return;
		}
		const formdata = new FormData();
		formdata.append("name", updatedUser.name);
		formdata.append("email", updatedUser.email);
		formdata.append("status", updatedUser.status);
		formdata.append("birthDate", updatedUser.birthDate);
		formdata.append("phone", updatedUser.phone);
		formdata.append("website", updatedUser.website);
		formdata.append("githubUsername", updatedUser.githubUsername);
		formdata.append("location", updatedUser.location);
		formdata.append("speciality", updatedUser.speciality);
		formdata.append("bio", updatedUser.bio.substr(0, 220));

		dispatch(updateUserInfo(formdata));
		setModif(false);
		setIsUpdatingAvatar(false);
	};

	const onValueChange = (e, index) => {
		e.preventDefault();
		if (e.target.type === "password") {
			setUpdatedPassword({
				...updatedPassword,
				[e.target.name]: e.target.value,
			});
			setModif(true);
			return;
		}
		if ([e.target.name] === "facebook") {
			setUpdatedUser((current) => {
				let social = { ...current.social };
				social = { ...social, facebook: e.target.value };
				return { ...current, social };
			});
		}
		setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
		setModif(true);
	};

	const handleDeleteAccount = (e) => {
		e.preventDefault();
		dispatch(deleteUser({ date: Date.now }));
		setDeleteBtnClicked(true);
	};

	return (
		<>
			<Nav />
			<ToastContainer />
			{loading ? (
				<Loading />
			) : (
				<>
					<MetaData title="Edit Profile" />
					{user && (
						<div className="container">
							<div className="row">
								<div className="col-12 col-md-4">
									<div className="card">
										<div className="card-body">
											<div className="d-flex flex-column align-items-center text-center">
												{isUpdatingAvatar ? (
													<div className="col d-flex justify-content-between">
														<ChangePhoto
															img={img}
															setImage={setImage}
															name="avatar"
															isEditing={isEditing}
															setIsEditing={setIsEditing}
														/>
														<button
															onClick={() => {
																setIsUpdatingAvatar(!isUpdatingAvatar);
															}}
															className="btn btn-close col-2 col-sm-1"
														></button>
													</div>
												) : (
													<img
														src={user.avatar.url}
														alt="Avatar"
														className="rounded-circle"
														width="150"
													/>
												)}
												<button
													onClick={
														isUpdatingAvatar
															? () => {
																	handleUpdateUser(null, 1);
															  }
															: () => setIsUpdatingAvatar(!isUpdatingAvatar)
													}
													className="btn btn-outline-info btn-sm"
												>
													{isUpdatingAvatar ? "submit changes" : "Change photo"}
												</button>
												<div className="mt-3">
													<h4>{updatedUser.name}</h4>
													<p className="text-secondary mb-1">
														{updatedUser.status}
													</p>
													<p className="text-muted font-size-sm">
														{changeToAge(updatedUser.birthDate)}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="card mt-3">
										<ul className="list-group list-group-flush">
											<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 className="mb-0">Followers</h6>
												<span className="text-secondary">Coming soon</span>
											</li>
											<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 className="mb-0">Following</h6>
												<span className="text-secondary">Coming soon</span>
											</li>
											<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 className="mb-0">Likes</h6>
												<span className="text-secondary"></span>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-12 col-md-8">
									<div className="card mb-3">
										<div className="btn-group">
											<button
												className="btn btn-outline-dark shadow-sm rounded-0"
												autoComplete="off"
												data-bs-toggle="button"
												onClick={() => setPage(1)}
											>
												Personnel Info
											</button>
											<button
												className="btn btn-outline-dark shadow-sm rounded-0 "
												autoComplete="off"
												data-bs-toggle="button"
												onClick={() => setPage(2)}
											>
												Career
											</button>
										</div>

										<div className="card-body">
											{page === 1 && (
												<>
													<Attribute
														attribute="Name"
														onChange={onValueChange}
														name="name"
														user={updatedUser.name}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute="Email"
														onChange={onValueChange}
														name="email"
														user={updatedUser.email}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
														origUserEmail={user.email}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Phone"}
														onChange={onValueChange}
														name="phone"
														user={updatedUser.phone}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Birth Date"}
														onChange={onValueChange}
														name="birthDate"
														user={dateFormat(updatedUser.birthDate)}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Location"}
														onChange={onValueChange}
														name="location"
														user={updatedUser.location}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />
													<Attribute
														attribute={"Password"}
														onChange={onValueChange}
														name="password"
														user={updatedUser.password}
														password={updatedPassword}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
														setUpdatedPassword={setUpdatedPassword}
														handleUpdatePassword={handleUpdatePassword}
													/>
												</>
											)}
											{page === 2 && (
												<>
													<Attribute
														attribute={"status"}
														onChange={onValueChange}
														name="status"
														user={updatedUser.status}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Speciality"}
														onChange={onValueChange}
														name="speciality"
														user={updatedUser.speciality}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Skills"}
														name="skills"
														userSkills={updatedUser.skills}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"website"}
														onChange={onValueChange}
														name="website"
														user={updatedUser.website}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"githubUsername"}
														onChange={onValueChange}
														name="githubUsername"
														user={updatedUser.githubUsername}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Experience"}
														name="experience"
														userExperience={updatedUser.experience}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Education"}
														name="education"
														userEducation={updatedUser.education}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Social"}
														name="social"
														userSocial={updatedUser.social}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />

													<Attribute
														attribute={"Bio"}
														onChange={onValueChange}
														name="bio"
														user={updatedUser.bio}
														isEditing={isEditing}
														setIsEditing={setIsEditing}
													/>

													<hr className="my-1 py-1" />
												</>
											)}

											<div className="col pb-0 mb-0">
												{modif && (
													<button
														onClick={handleUpdateUser}
														className="btn btn-primary float-start "
													>
														Confirm Changes
													</button>
												)}

												<button
													onClick={handleDeleteAccount}
													className="btn btn-danger float-end"
												>
													Delete account
												</button>
											</div>
										</div>
									</div>
									<div className="row gutters-sm"></div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default UserProfileDetails;
