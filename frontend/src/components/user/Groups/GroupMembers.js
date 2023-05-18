import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockRequest } from "../../../redux/reducers/groupsReducers";
import { MdOutlineBlock } from "react-icons/md";

const GroupMembers = ({ member }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user.auth);
	const { group } = useSelector((state) => state.group.group);
	const handleBlockRequest = (e) => {
		e.preventDefault();
		dispatch(blockRequest(group._id, member._id));
	};
	return (
		<>
			<div className="d-flex flex-wrap justify-content-around align-items-center">
				<div className="d-flex align-items-center ">
					<img
						src={member.avatar.url}
						className="img-fluid rounded me-5"
						height="80"
						width="80"
						alt="news"
					/>
					
					<div className="d-flex flex-column gap-2">
						<div>
							<h4 className="position-relative d-flex font-monospace">
								{member.name}{" "}
								{member._id === group.owner._id && (
									<span class="badge bg-secondary">Admin</span>
								)}
							</h4>
						</div>
						<h6>{member.status}</h6>
						<h6>{member.speciality}</h6>
					</div>
				</div>
				<div className="d-flex flex-column gap-2">
					<h6>Followers : {member.followers.length}</h6>
					<h6>Posts : {}</h6>
					<h6>Likes : 1</h6>
				</div>
				<div className="d-flex flex-column gap-2">
					<h6>
						Education :{" "}
						{member.education.map((edu) => {
							return <span key={edu}> {edu.degree} |</span>;
						})}
					</h6>
					<h6>
						experiences :
						{member.experience.map((exp) => {
							return <span key={exp}> {exp.title} |</span>;
						})}
					</h6>
					<h6>
						Skills :{" "}
						{member.skills.map((skill) => {
							return <span key={skill}> {skill} |</span>;
						})}
					</h6>
				</div>
				{user._id === group.owner._id && member._id !== group.owner._id && (
					<button className="btn btn-warning" onClick={handleBlockRequest}>
						<MdOutlineBlock size="20" className="my-auto" />
					</button>
				)}
			</div>

			<hr />
		</>
	);
};

export default GroupMembers;
