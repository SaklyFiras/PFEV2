import React from "react";
import Post from "../../profile/Post";

const GroupPosts = ({ post }) => {
	return (
		<div className="mx-4 my-3">
			<Post post={post} />
		</div>
	);
};

export default GroupPosts;
