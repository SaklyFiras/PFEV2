import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import PostDetails from "./PostDetails";
import { dateFormat, changeToAge } from "../user/userProfileDetails";
import { useParams } from "react-router-dom";

const Post = ({ post }) => {
	const [showModal, setShowModal] = useState(false);
	const param = useParams();

	useEffect(() => {
		if (window.location.search === "?view=true") {
			setShowModal(true);
		}
		return () => {
			param.id = null;
		};
	}, []);

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => {
		setShowModal(false);
		setTimeout(() => {
			if (window.location.pathname === `/post/${post._id}`) {
				window.history.pushState(null, null, `/accueil`);
			}
		}, 200);
	};

	return (
		<>
			<Card onClick={handleShowModal}>
				<Card.Header className="d-flex justify-content-between align-items-center py-0">
					<div>
						<img
							className="rounded-circle"
							src={post.user.avatar.url}
							alt={post.user.name}
							width="60"
							height="60"
						/>
						<span className="ml-2">{post.user.name}</span>
					</div>
					<div className=""></div>
				</Card.Header>
				<Card.Body>
					<Card.Title>{post.postInfo.title}</Card.Title>
					<div className="d-flex justify-content-end mb-2">
						<Card.Subtitle className="text-muted">
							{post.postInfo.gender}, {changeToAge(post.postInfo.dateOfBirth)}
						</Card.Subtitle>
					</div>
					<Card.Text>{post.postInfo.description}</Card.Text>
				</Card.Body>
				<Card.Footer className="m-0 d-flex justify-content-between">
					<div>
						<small className="text-muted mx-3">{post.likes.length} likes</small>
						<small className="text-muted ml-2">
							{post.comments.length} comments
						</small>
					</div>
					<small className="text-muted">{dateFormat(post.createdAt)}</small>
				</Card.Footer>
			</Card>

			<Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
				<Modal.Body>
					<PostDetails
						post={post}
						setShowModal={setShowModal}
						showModal={showModal}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Post;
