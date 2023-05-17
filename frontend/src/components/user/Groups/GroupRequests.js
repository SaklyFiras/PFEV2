import React from "react";
import {
	MdOutlineBlock,
	MdOutlineCancel,
	MdOutlineGroupAdd,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
	acceptRequest,
	declineRequest,
	
} from "../../../redux/reducers/groupsReducers";

const GroupRequests = ({ request }) => {
	const dispatch = useDispatch();
	const { loading, error, group } = useSelector((state) => state.group);
	const handleAcceptRequest = (e) => {
		e.preventDefault();
		dispatch(acceptRequest(group.group._id, request._id));
	};

	const handleRejectRequest = (e) => {
		e.preventDefault();
		dispatch(declineRequest(group.group._id, request._id));
	};

	
	return (
		<>
			<div className="d-flex flex-wrap justify-content-around align-items-center">
				<div className="d-flex align-items-center ">
					<img
						src={request.avatar.url}
						className="img-fluid rounded me-5"
						height="80"
						width="80"
						alt="news"
					/>
					<div className="d-flex flex-column gap-2">
						<div>
							<h4 className="position-relative d-flex font-monospace">
								{request.name}{" "}
							</h4>
						</div>
						<h6>{request.status}</h6>
						<h6>{request.speciality}</h6>
					</div>
				</div>
				<div className="d-flex flex-column gap-2">
					<h6>Followers : {request.followers.length}</h6>
					<h6>Posts : {}</h6>
					<h6>Likes : 1</h6>
				</div>
				<div className="d-flex flex-column gap-2">
					<h6>
						Education :{" "}
						{request.education.map((edu) => {
							return <span> {edu.degree} |</span>;
						})}
					</h6>
					<h6>
						experiences :
						{request.experience.map((exp) => {
							return <span> {exp.title} |</span>;
						})}
					</h6>
					<h6>
						Skills :{" "}
						{request.skills.map((skill) => {
							return <span> {skill} |</span>;
						})}
					</h6>
				</div>
				<div className="d-flex flex-column gap-2">
					<button className="btn btn-success" onClick={handleAcceptRequest}>
						<MdOutlineGroupAdd size="20" className="my-auto" />
					</button>
					<button className="btn btn-danger" onClick={handleRejectRequest}>
						<MdOutlineCancel size="20" className="my-auto" />
					</button>
					
				</div>
			</div>

			<hr />
		</>
	);
};

export default GroupRequests;
