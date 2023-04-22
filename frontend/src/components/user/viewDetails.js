import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dateFormat } from "./userProfileDetails";

const expFormat = (exp) => {
	if (!exp) {
		return null;
	}
	return {
		current: exp.current ? "YES" : "NO",
		title: exp.title,
		company: exp.company,
		startDate: dateFormat(exp.startDate),
		endDate: dateFormat(exp.endDate),
		description: exp.description,
		location: exp.location,
	};
};

const eduFormat = (edu) => {
	if (!edu) return null;
	return {
		current: edu.current ? "YES" : "NO",
		school: edu.school,
        degree: edu.degree,
		startDate: dateFormat(edu.startDate),
		endDate: dateFormat(edu.endDate),
		description: edu.description,
	};
};
const ViewDetails = () => {
	const { visitedUser } = useSelector((state) => state.user.visit);
	const [experience, setExperience] = useState(expFormat(visitedUser.experience[0]));
	const [education, setEducation] = useState(eduFormat(visitedUser.education[0]));
	return (
		<div className="col-sm-8 mb-3">
			<div className="card h-100">
				<div className="card-body">
					<div className="row ">
						<div className="col d-flex justify-content-between ">
							<i className="col text-info">Experience</i>

							<div
								className="btn-toolbar mb-3"
								role="toolbar"
								aria-label="Toolbar with button groups"
							>
								<div
									className="btn-group btn-group-sm"
									role="group"
									aria-label="First group"
								>
									{visitedUser.experience.map((exp, index) => (
										<button
											key={index}
											onClick={() =>
												setExperience(expFormat(visitedUser.experience[index]))
											}
											type="button"
											className="btn btn-outline-secondary"
										>
											{index + 1}
										</button>
									))}
								</div>
							</div>
						</div>
						{experience&&Object.keys(experience).map((keyName, keyIndex) => (
							<div className="row" key={keyIndex}>
								<div className="col-sm-3">
									<h6 className="mb-0 fw-bold">{keyName}:</h6>
								</div>

								<div className="col-sm-9 text-secondary ">
									{experience[keyName]}
								</div>
							</div>
						))}
						<hr />

						<div className="col d-flex justify-content-between ">
							<i className="col text-info">Education</i>

							<div
								className="btn-toolbar mb-3"
								role="toolbar"
								aria-label="Toolbar with button groups"
							>
								<div
									className="btn-group btn-group-sm"
									role="group"
									aria-label="First group"
								>
									{visitedUser.education.map((edu, index) => (
										<button
											key={index}
											onClick={() =>
												setEducation(eduFormat(visitedUser.education[index]))
											}
											type="button"
											className="btn btn-outline-secondary"
										>
											{index + 1}
										</button>
									))}
								</div>
							</div>
						</div>
						{education &&
							Object.keys(education).map((keyName, keyIndex) => (
								<div className="row" key={keyIndex}>
									<div className="col-sm-3">
										<h6 className="mb-0 fw-bold">{keyName}:</h6>
									</div>

									<div className="col-sm-9 text-secondary ">
										{education[keyName]}
									</div>
								</div>
							))}
						<hr />
                        <div className="row" >
									<div className="col-sm-3">
										<h6 className="mb-0 fw-bold">Website</h6>
									</div>

									<div className="col-sm-9 text-secondary ">
										{visitedUser.website}
									</div>
								</div>
                                <hr/>
                                <div className="row" >
									<div className="col-sm-3">
										<h6 className="mb-0 fw-bold">Location</h6>
									</div>

									<div className="col-sm-9 text-secondary ">
										{visitedUser.location}
									</div>
								</div>
                                <hr/>
                                
                        
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewDetails;
