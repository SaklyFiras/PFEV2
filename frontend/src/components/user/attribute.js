import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiPencil } from "react-icons/bi";
import "./animation.css";
import { dateFormat } from "./userProfileDetails";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../redux/reducers/userReducers";

const Attribute = ({
	attribute,
	onChange,
	name,
	user,
	password,
	handleUpdatePassword,
	userExperience,
	userEducation,
	userSkills,
	userSocial,
}) => {
	// USER EXPERIENCE HANDLING

	const [userExp, setUserExp] = useState(userExperience);
	const [expForm, setExpForm] = useState([
		{
			title: "",
			company: "",
			location: "",
			startDate: null,
			endDate: null,
			description: "",
		},
	]);
	const addExperience = () => {
		setUserExp([...userExp, expForm]);
		setUserExp([...userExp, expForm]);
	};
	const removeExperience = () => {
		setUserExp(userExp.slice(0, -1));
	};
	const saveExperience = () => {
		dispatch(updateUserInfo({ experience: userExp }));
	};

	const onChangeSelectedExp = (e) => {
		const { title, company, location, startDate, endDate, description } =
			userExp[e.target.selectedIndex];
		setExpForm({ title, company, location, startDate, endDate, description });
	};
	const onChangeExp = (e) => {
		setExpForm({ ...expForm, [e.target.name]: e.target.value });
	};
	// USER EDUCATION HANDLING
	const [userEdu, setUserEdu] = useState(userEducation);
	const [eduForm, setEduForm] = useState([
		{
			current: false,
			degree: "",
			school: "",
			startDate: null,
			endDate: null,
			description: "",
		},
	]);

	const addEducation = () => {
		setUserEdu([...userEdu, eduForm]);
		setUserEdu([...userEdu, eduForm]);
	};
	const removeEducation = () => {
		setUserEdu(userEdu.slice(0, -1));
	};
	const saveEducation = () => {
		dispatch(updateUserInfo({ education: userEdu }));
	};
	const onChangeSelectedEdu = (e) => {
		const { current, degree, school, startDate, endDate, description } =
			userEdu[e.target.selectedIndex];
		setEduForm({ current, degree, school, startDate, endDate, description });
	};
	const onChangeEdu = (e) => {
		setEduForm({ ...eduForm, [e.target.name]: e.target.value });
	};
	// USER SKILLS HANDLING
	const [inputs, setInputs] = useState(userSkills);
	const handleAddInput = () => {
		setInputs([...inputs, ""]);
	};

	const handleRemoveInput = (index) => {
		const newInputs = [...inputs];
		newInputs.splice(index, 1);
		setInputs(newInputs);
	};
	const saveSkills = async () => {
		dispatch(updateUserInfo({ skills: inputs }));
	};

	// USER SOCIAL HANDLING
	const [social, setSocial] = useState(userSocial);
	const dispatch = useDispatch();

	const onclickhandler = (e) => {
		e.preventDefault();
		setIsEditing(!isEditing);
	};
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			setIsEditing(false);
		}
	};

	const handleUpdateSocial = (e) => {
		e.preventDefault();
		dispatch(updateUserInfo({ social: social }));
	};

	const [isEditing, setIsEditing] = useState(false);

	return (
		<>
			{isEditing ? (
				<>
					{`${attribute} :`}
					{name === "name" && (
						<input
							name={name}
							type="text"
							value={user.name}
							onChange={onChange}
							onKeyDown={handleKeyPress}
						/>
					)}
					{name === "email" && (
						<input
							id="email"
							name={name}
							type="email"
							value={user.email}
							onChange={onChange}
							onKeyDown={handleKeyPress}
							required
						/>
					)}
					{name === "phone" && (
						<input
							name={name}
							type="number"
							min="0"
							max="99999999"
							value={user.phone}
							onChange={onChange}
							onKeyDown={handleKeyPress}
						/>
					)}
					{name === "experience" && (
						<>
							<div className="row d-flex justify-content-around">
								<div className="col">
									<select
										name="experience"
										onKeyDown={handleKeyPress}
										onChange={onChangeSelectedExp}
									>
										{userExp.map((exp, index) => (
											<option key={index} value={exp}>
												{exp.title}
											</option>
										))}
									</select>

									<button
										onClick={removeExperience}
										className="btn btn-outline-danger btn-sm mx-3"
									>
										-
									</button>
								</div>
								<div className="form-group d-grid ">
									<div className="row mt-2">
										<label
											className="col pt-2 form-check-label col-sm-9"
											htmlFor="current"
										>
											Current
										</label>
										<input
											className="form-check-input col col-sm-2"
											value={expForm.current}
											type="checkbox"
											name="current"
											onChange={() => {
												setExpForm({ ...expForm, current: !expForm.current });
											}}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="title">
											Title
										</label>

										<input
											className="col "
											onChange={onChangeExp}
											name="title"
											value={expForm.title}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="company">
											Company
										</label>
										<input
											className="col"
											onChange={onChangeExp}
											name="company"
											value={expForm.company}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="location">
											Location
										</label>
										<input
											className="col"
											onChange={onChangeExp}
											name="location"
											value={expForm.location}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="startDate">
											Start Date
										</label>
										<input
											className="col"
											onChange={onChangeExp}
											type="date"
											name="startDate"
											value={dateFormat(expForm.startDate)}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="endDate">
											End Date
										</label>
										<input
											className="col"
											onChange={onChangeExp}
											type="date"
											name="endDate"
											value={dateFormat(expForm.endDate)}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="description">
											Description
										</label>
										<input
											className="col"
											onChange={onChangeExp}
											name="description"
											value={expForm.description}
										/>
									</div>
									<div className="col mx-auto d-flex ">
										<button
											onClick={addExperience}
											className="btn btn-outline-info btn-sm mx-2"
										>
											Add
										</button>
										<button
											onClick={saveExperience}
											className="btn btn-outline-success btn-sm"
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</>
					)}
					{name === "education" && (
						<>
							<div className="row d-flex justify-content-around">
								<div className="col">
									<select
										name="education"
										onKeyDown={handleKeyPress}
										onChange={onChangeSelectedEdu}
										defaultValue={userEdu[0]}
									>
										{userEdu.map((edu, index) => (
											<option key={index} value={edu}>
												{edu.degree}
											</option>
										))}
									</select>

									<button
										onClick={removeEducation}
										className="btn btn-outline-danger btn-sm mx-3"
									>
										-
									</button>
								</div>
								<div className="form-group d-grid ">
									<div className="row mt-2">
										<label
											className="col form-check-label col-sm-9"
											htmlFor="current"
										>
											Current
										</label>
										<input
											className="form-check-input col col-sm-2"
											value={eduForm.current}
											type="checkbox"
											name="current"
											onChange={() =>
												setEduForm({
													...eduForm,
													current: !eduForm.current,
												})
											}
										/>
									</div>
									<div className="row">
										<label className="col pt-2 pt-2" htmlFor="degree">
											degree
										</label>
										<input
											className="col"
											onChange={onChangeEdu}
											name="degree"
											value={eduForm.degree}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="location">
											School
										</label>
										<input
											className="col"
											onChange={onChangeEdu}
											name="school"
											value={eduForm.school}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="startDate">
											Start Date
										</label>
										<input
											className="col"
											onChange={onChangeEdu}
											type="date"
											name="startDate"
											value={dateFormat(eduForm.startDate)}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="endDate">
											End Date
										</label>
										<input
											className="col"
											onChange={onChangeEdu}
											type="date"
											name="endDate"
											value={dateFormat(eduForm.endDate)}
										/>
									</div>
									<div className="row">
										<label className="col pt-2" htmlFor="description">
											Description
										</label>
										<input
											className="col"
											onChange={onChangeEdu}
											name="description"
											value={eduForm.description}
										/>
									</div>
									<div className="col mx-auto d-flex ">
										<button
											onClick={addEducation}
											className="btn btn-outline-info btn-sm mx-2"
										>
											Add
										</button>
										<button
											onClick={saveEducation}
											className="btn btn-outline-success btn-sm"
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</>
					)}
					{name === "status" && (
						<select
							name={name}
							value={user.status}
							onChange={onChange}
							onKeyDown={handleKeyPress}
						>
							<option value="Student">Student</option>
							<option value="Professor">Professor</option>
							<option value="Dentist">Dentist</option>
							<option value="Expert">Expert</option>
						</select>
					)}
					{name === "birthDate" && (
						<input
							name={name}
							type="date"
							value={user.birthDate}
							onChange={onChange}
							onKeyDown={handleKeyPress}
							min="1940-01-01"
							max="2022-12-31"
						/>
					)}
					{name === "password" && (
						<>
							<div className="row d-flex justify-content-between">
								<input
									className="row-1"
									name="oldPassword"
									placeholder="oldPassword"
									type="password"
									value={password.oldPassword}
									onChange={onChange}
									onKeyDown={handleKeyPress}
								/>
								<input
									className="row-2"
									name="newPassword"
									type="password"
									placeholder="newPassword"
									value={password.newPassword}
									onChange={onChange}
									onKeyDown={handleKeyPress}
								/>
								<input
									className="row-3"
									name="confirmPassword"
									type="password"
									placeholder="confirmPassword"
									value={password.confirmPassword}
									onChange={onChange}
									onKeyDown={handleKeyPress}
								/>
								<button
									onClick={handleUpdatePassword}
									className="btn btn-primary btn-sm col-md-3 mt-2 mx-auto"
								>
									Validate
								</button>
							</div>
						</>
					)}
					{name === "website" && (
						<input
							name={name}
							type="text"
							onChange={onChange}
							onKeyDown={handleKeyPress}
						/>
					)}
					{name === "speciality" && (
						<select
							className="form-select w-75 mx-2"
							aria-label="Default select example"
							name={name}
							onChange={onChange}
						>
							<option value="Dental Anesthesiology">
								Dental Anesthesiology
							</option>
							<option value="Dental Public Health">Dental Public Health</option>
							<option value="Endodontics">Endodontics</option>
							<option value="Oral And Maxillo facial Pathology">
								Oral And Maxillofacial Pathology
							</option>
							<option value="Oral And Maxillo facial Radiology">
								Oral And Maxillofacial Radiology
							</option>
							<option value="Oral And Maxillo facial Surgery">
								Oral And Maxillofacial Surgery
							</option>
							<option value="Oral Medicine">Oral Medicine</option>
							<option value="Orofacial Pain">Orofacial Pain</option>
							<option value="Orthodontics">Orthodontics</option>
							<option value="Dentofacial Orthopedics">
								Dentofacial Orthopedics
							</option>
							<option value="Pediatric Dentistry">Pediatric Dentistry</option>
							<option value="Periodontics">Periodontics</option>
							<option value="Prosthodontics">Prosthodontics</option>
							<option value="Dental Hygiene">Dental Hygiene</option>
						</select>
					)}
					{name === "location" && (
						<select
							className="form-select w-75 mx-2"
							aria-label="Default select example"
							name={name}
							onChange={onChange}
							value={user}
						>
							<option value="Ariana">Ariana</option>
							<option value="Beja">Beja</option>
							<option value="Ben Arous">Ben Arous</option>
							<option value="Bizerte">Bizerte</option>
							<option value="Gabes">Gabes</option>
							<option value="Gafsa">Gafsa</option>
							<option value="Jendouba">Jendouba</option>
							<option value="Kairouan">Kairouan</option>
							<option value="Kasserine">Kasserine</option>
							<option value="Kebili">Kebili</option>
							<option value="Kef">Kef</option>
							<option value="Mahdia">Mahdia</option>
							<option value="Manouba">Manouba</option>
							<option value="Medenine">Medenine</option>
							<option value="Monastir">Monastir</option>
							<option value="Nabeul">Nabeul</option>
							<option value="Sfax">Sfax</option>
							<option value="Sidi Bouzid">Sidi Bouzid</option>
							<option value="Siliana">Siliana</option>
							<option value="Sousse">Sousse</option>
							<option value="Tataouine">Tataouine</option>
							<option value="Tozeur">Tozeur</option>
							<option value="Tunis">Tunis</option>
							<option value="Zaghouan">Zaghouan</option>
						</select>
					)}
					{name === "githubUsername" && (
						<input
							name={name}
							type="text"
							onChange={onChange}
							onKeyDown={handleKeyPress}
						/>
					)}
					{name === "bio" && (
						<input
							name={name}
							type="textarea"
							onChange={onChange}
							onKeyDown={handleKeyPress}
							value={user}
						/>
					)}
					{name === "skills" && (
						<>
							<div className="row d-flex justify-content-between">
								<div
									className="btn-group col col-sm-2 mx-auto"
									role="group"
									aria-label="Basic example"
								>
									<button
										onClick={handleAddInput}
										className="btn btn-outline-success btn-sm"
									>
										+
									</button>
									<button
										onClick={handleRemoveInput}
										className="btn btn-outline-danger btn-sm"
									>
										-
									</button>
								</div>
								{inputs.map((skill, index) => (
									<div
										className="row d-flex justify-content-between"
										key={index}
									>
										<input
											className="row-1"
											name="skill"
											type="text"
											placeholder="skill"
											value={skill}
											onChange={(e) => {
												const newSkills = [...inputs];
												newSkills[index] = e.target.value;
												setInputs(newSkills);
											}}
											onKeyDown={handleKeyPress}
										/>
									</div>
								))}
								<button
									onClick={saveSkills}
									className="col col-sm-2 mx-auto btn btn-outline-success btn-sm"
								>
									save
								</button>
							</div>
						</>
					)}

					{name === "social" && (
						<>
							<div className="row d-flex justify-content-between">
								<div className="col-md-3">
									<input
										className="row-1"
										name="facebook"
										type="text"
										placeholder="facebook"
										onChange={(e) => {
											setSocial({
												...social,
												facebook: e.target.value,
											});
										}}
										onKeyDown={handleKeyPress}
									/>
								</div>
								<div className="col-md-3">
									<input
										className="row-2"
										name="twitter"
										type="text"
										placeholder="twitter"
										onChange={(e) => {
											setSocial({
												...social,
												twitter: e.target.value,
											});
										}}
										onKeyDown={handleKeyPress}
									/>
								</div>
								<div className="col-md-3">
									<input
										className="row-3"
										name="linkedin"
										type="text"
										placeholder="linkedin"
										onChange={(e) => {
											setSocial({
												...social,
												linkedin: e.target.value,
											});
										}}
										onKeyDown={handleKeyPress}
									/>
								</div>
								<div className="col-md-3">
									<input
										className="row-4"
										name="youtube"
										type="text"
										placeholder="youtube"
										onChange={(e) => {
											setSocial({
												...social,
												youtube: e.target.value,
											});
										}}
										onKeyDown={handleKeyPress}
									/>
								</div>
								<div className="col-md-3">
									<input
										className="row-5"
										name="instagram"
										type="text"
										placeholder="instagram"
										onChange={(e) => {
											setSocial({
												...social,
												instagram: e.target.value,
											});
										}}
										onKeyDown={handleKeyPress}
									/>
									<div />
								</div>
								<button
									onClick={handleUpdateSocial}
									className="btn btn-outline-success btn-sm"
								>
									save
								</button>
							</div>
						</>
					)}
				</>
			) : (
				<>
					<div className="row">
						<div className="col-sm-3">
							<h6 className="mb-0 fw-bold">{attribute}</h6>
						</div>
						<div className="col-sm-9 text-secondary ">
							{JSON.stringify(user)}
							{userExp &&
								userExp.map((exp) => <div key={exp._id}>{exp.title}</div>)}
							{userSkills &&
								userSkills.map((skill) => <div key={skill._id}>{skill}</div>)}
							{userEdu &&
								userEdu.map((edu) => <div key={edu._id}>{edu.degree}</div>)}
							{userSocial &&
								Object.keys(userSocial).map((keyName, keyIndex) => (
									<div key={keyIndex}>
										{keyName}: {userSocial[keyName]}
									</div>
								))}

							<button
								onClick={onclickhandler}
								className="btn btn-outline-secondary btn-sm float-end"
							>
								<BiPencil
									style={{
										display: "flex",
										justifyContent: "center",
										margin: "0.5vh 0",
									}}
								/>
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Attribute;
