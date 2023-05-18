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
		const CalculatedRating =
			rating.reduce((acc, item) => acc + item.rating, 0) / rating.length;

		if (isNaN(CalculatedRating) || CalculatedRating === 0) {
			return <div>No rating yet</div>;
		}
		let icons = [];

		// Calculate the number of full and half stars
		const fullStars = Math.floor(CalculatedRating);
		const hasHalfStar = CalculatedRating % 1 !== 0;

		// Add full stars
		for (let i = 0; i < fullStars; i++) {
			icons.push(<MdStar size="20" key={i} />);
		}

		// Add half star if needed
		if (hasHalfStar) {
			icons.push(<MdStarHalf size="20" key="half" />);
		}

		// Add empty stars to complete the CalculatedRating out of 5
		const remainingStars = 5 - Math.ceil(CalculatedRating);
		for (let i = 0; i < remainingStars; i++) {
			icons.push(<MdStarOutline size="20" key={`empty ${i}`} />);
		}

		return icons;
	};

	const ratingIcons = getRatingIcons(rating);

	return <div>{ratingIcons}</div>;
};

const GroupCard = ({ group }) => {
	const { user } = useSelector((state) => state.user.auth);
	const dispatch = useDispatch();

	const sendRequestHandler = (e) => {
		e.preventDefault();
		dispatch(sendRequest(group._id, user._id));
	};

	return (
		<div className="card">
			<div className="card-header d-flex bg-secondary bg-opacity-50 justify-content-between">
				<h4 className=" flex-grow-1">{group.name}</h4>
				{!(
					group.members.includes(user._id) ||
					group.joinRequests.includes(user._id)
				) && (
					<button
						className="btn btn-outline-primary bg-light bg-opacity-25"
						onClick={sendRequestHandler}
					>
						Send a Request
					</button>
				)}
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
							{group.ratings ? (
								RatingIcons({ rating: group.ratings })
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
