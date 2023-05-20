import React from "react";
import { Link } from "react-router-dom";

const GroupsJoined = ({group}) => {
	return (
		<>
			<div className="text-center   alert alert-secondary p-1">
				<img
					src={group.image.url}
					alt="Admin"
					className=" me-3 my-auto m-2"
					width="40"
				/>
				<Link to={group._id} className="my-auto ">{group.name}</Link>
			</div>
			
			
		</>
	);
};

export default GroupsJoined;
