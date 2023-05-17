import React from "react";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import { dateFormat } from "../userProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../../../redux/reducers/groupsReducers";

export const RatingIcons = ({ rating }) => {
	const fullIcon = <MdStar size="20" />;
	const halfIcon = <MdStarHalf size="20" />;
	const emptyIcon = <MdStarOutline size="20" />;

	const getRatingIcons = (rating) => {
		let icons = [];

		// Calculate the number of full and half stars
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;

		// Add full stars
		for (let i = 0; i < fullStars; i++) {
			icons.push(fullIcon);
		}

		// Add half star if needed
		if (hasHalfStar) {
			icons.push(halfIcon);
		}

		// Add empty stars to complete the rating out of 5
		const remainingStars = 5 - Math.ceil(rating);
		for (let i = 0; i < remainingStars; i++) {
			icons.push(emptyIcon);
		}

		return icons;
	};

	const ratingIcons = getRatingIcons(rating);

	return <>{ratingIcons}</>;
};

const GroupCard = ({ group }) => {
	const { user } = useSelector((state) => state.user.auth);
	const dispatch = useDispatch();

	const sendRequestHandler = () => {
		dispatch(sendRequest(group._id, user._id));
	};

	return (
		<div className="card">
			<div className="card-header d-flex bg-secondary bg-opacity-50 justify-content-between">
				<h4 className=" flex-grow-1">{group.name}</h4>
				<button
					className="btn btn-outline-primary bg-light bg-opacity-25"
					onClick={sendRequestHandler}
				>
					Send a Request
				</button>
			</div>
			<div className="card-body d-flex justify-content-between bg-light mb-0 bg-opacity-25 pb-0">
				<div className=" d-flex flex-grow-1">
					<img
						src={group.image.url}
						alt="Admin"
						className="rounded-circle"
						width="80"
					/>
					<div className="d-flex flex-column gap-2 ms-3">
						<h6 className="">Admin : {group.owner.name}</h6>
						<h6 className="">Members : {group.members.length}</h6>
						<h6 className="">posts : {group.posts.length}</h6>
					</div>
				</div>
				<div className=" d-flex">
					<div className="d-flex flex-column gap-2">
						<div className="d-flex align-items-around">
							<h6 className="m-0">Rating :</h6>
							{group.rating ? (
								RatingIcons({ rating: group.rating.rating })
							) : (
								<h6 className="m-0">No Rating</h6>
							)}
						</div>
						<h6 className="">Created : {dateFormat(group.createdAt)}</h6>
					</div>
				</div>
			</div>
			<hr className="mt-0 w-75 mx-auto" />
			<p className="px-3">
				<i className=" fw-bolder ">Description : </i>
				{group.description}
			</p>
		</div>
	);
};

export default GroupCard;
