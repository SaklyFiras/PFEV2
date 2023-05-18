import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import {rateGroup} from "../../../redux/reducers/groupsReducers";

const RatingModal = () => {
    const dispatch = useDispatch();
    const {group} = useSelector(state => state.group.group);
	const [showModal, setShowModal] = useState(false);
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);

	const handleRatingChange = (newRating) => {
		setRating(newRating);
	};

	const handleHoverRatingChange = (hoveredRating) => {
		setHoveredRating(hoveredRating);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleButtonClick = () => {
		setShowModal(true);
	};
    const handleSubmitRating = () => {
        dispatch(rateGroup(group._id, rating));
        setShowModal(false);
    }

	const handleRatingMessage = (rating) => {
		if (!rating) {
			return "No rating yet.";
		}
		switch (rating) {
			case 1:
				return "Terrible";
			case 2:
				return "Mediocre";
			case 3:
				return "Average";
			case 4:
				return "Solid";
			case 5:
				return "Fantastic";
			default:
				return "";
		}
	};

	return (
		<div>
			<Button variant="link" onClick={handleButtonClick}>
				Rate this group
			</Button>

			<Modal show={showModal} onHide={handleModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Rate out of 5</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="rating-container d-flex justify-content-center">
						{[1, 2, 3, 4, 5].map((star) => (
							<FaStar
								className="rating-star"
								size={50}
								key={star}
								style={{
									cursor: "pointer",
									color: star <= (hoveredRating || rating) ? "yellow" : "gray",
								}}
								onMouseEnter={() => handleHoverRatingChange(star)}
								onMouseLeave={() => handleHoverRatingChange(0)}
								onClick={() => handleRatingChange(star)}
							/>
						))}
					</div>
					{rating ? (
						<div className="text-center mt-3 mb-0">
							<h6 className="m-0">{handleRatingMessage(rating)}</h6>
						</div>
					) : (
						<div className="text-center mt-3 mb-0">
							<h6 className="m-0">No rating yet.</h6>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModalClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmitRating}>
						Save Rating
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default RatingModal;
