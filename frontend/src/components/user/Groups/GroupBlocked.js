import React from "react";
import { MdOutlineBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { unblockRequest } from "../../../redux/reducers/groupsReducers";
const GroupBlocked = ({ blocked }) => {
	const dispatch = useDispatch();
	const { loading, error, group } = useSelector((state) => state.group);

	const handleUnblock = (e) => {
		e.preventDefault();
		dispatch(unblockRequest(group.group._id, blocked._id));
	};
	return (
		<>
			<div className="d-flex flex-wrap justify-content-around align-items-center">
				<div className="d-flex align-items-center ">
					<img
						src={blocked.avatar.url}
						className="img-fluid rounded me-5"
						height="80"
						width="80"
						alt="news"
					/>
					<div className="d-flex flex-column gap-2">
						<div>
							<h4 className="position-relative d-flex font-monospace">
								{blocked.name}{" "}
							</h4>
						</div>
						<h6>{blocked.status}</h6>
						<h6>{blocked.speciality}</h6>
					</div>
				</div>
				<div className="d-flex flex-column gap-2">
					<h6>Followers : {blocked.followers.length}</h6>
					<h6>Posts : {}</h6>
					<h6>Likes : 1</h6>
				</div>
				<div className="d-flex flex-column gap-2">
					<h6>
						Education :{" "}
						{blocked.education.map((edu) => {
							return <span> {edu.degree} |</span>;
						})}
					</h6>
					<h6>
						experiences :
						{blocked.experience.map((exp) => {
							return <span> {exp.title} |</span>;
						})}
					</h6>
					<h6>
						Skills :{" "}
						{blocked.skills.map((skill) => {
							return <span> {skill} |</span>;
						})}
					</h6>
				</div>
				<div className="d-flex flex-column gap-2">
					<button className="btn btn-secondary" onClick={handleUnblock}>
						<MdOutlineBackspace size="20" className="my-auto" />
					</button>
				</div>
			</div>

			<hr />
		</>
	);
};

export default GroupBlocked;
