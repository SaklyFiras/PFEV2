import React from "react";
import { Link } from "react-router-dom";

const GroupsJoined = ({group}) => {
	return (
		<>
			<div className="text-center d-flex justify-content-center">
				<img
					src="https://bootdey.com/img/Content/avatar/avatar1.png"
					alt="Admin"
					className="rounded-circle me-3"
					width="40"
				/>
				<Link to={group._id} className="my-auto">{group.name}</Link>
			</div>
			<hr />
			
		</>
	);
};

export default GroupsJoined;
