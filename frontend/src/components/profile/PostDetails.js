import { Button, Card, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";

import { BiChat, BiLike, BiTrash, BiPencil } from "react-icons/bi";
import MedicalInfoPost from "./MedicalInfoPost";
import Carousel from "react-bootstrap/Carousel";
import { changeToAge } from "../user/userProfileDetails";
import Loading from "../routes/loading";
import { createComment } from "../../redux/reducers/commentReducers";
import { likePost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalBtn from "../layout/Model";
import { useParams } from "react-router-dom";

import { deletePost, getPost } from "../../redux/reducers/postReducer";

const PostDetails = ({ post }) => {
	const { user } = useSelector((state) => state.user.auth);
	const { deleted } = useSelector((state) => state.post);
	const params = useParams();
	const dispatch = useDispatch();
	const [userName] = useState(post.user.name);
	const [userPicture] = useState(post.user.avatar.url);
	const [postLiked, setPostLiked] = useState(false);
	const [postLikes, setPostLikes] = useState(post.likes.length);

	const [comments, setComments] = useState(post.comments);
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [newCommentText, setNewCommentText] = useState("");

	useEffect(() => {
		post.likes.map((like) => {
			if (like._id === user._id) {
				setPostLiked(true);
			}
			return 0;
		});
	}, [post.likes, user._id]);

	useEffect(() => {
		deleted === "Post is deleted." && window.location.reload();
		if (params.id && !post) {
			dispatch(getPost(params.id));
		}
	}, [dispatch, params.id, post, deleted]);

	const handleAddComment = async ({ key }) => {
		if (newCommentText.trim() === "") {
			setShowCommentBox(false);
			return;
		}
		if (key === 1) {
			dispatch(
				createComment({
					postId: post._id,
					content: newCommentText,
					commentType: "diagnosis",
				})
			);
		} else {
			dispatch(
				createComment({
					postId: post._id,
					content: newCommentText,
					commentType: "treatmentPlan",
				})
			);
		}
		setComments([
			...comments,
			{
				user: {
					_id: user._id,
					name: user.name,
					avatar: {
						url: user.avatar.url,
					},
				},
				_id: newCommentText,
				content: newCommentText,
				likes: [],
				dislikes: [],
				commentType: key === 1 ? "diagnosis" : "treatmentPlan",
				createdAt: new Date(),
			},
		]);

		setNewCommentText("");
		setShowCommentBox(false);
	};

	const handleNewCommentTextChange = (event) => {
		setNewCommentText(event.target.value);
	};

	const handleLikePost = (postId) => {
		if (postLiked) {
			setPostLikes(postLikes - 1);
			setPostLiked(false);
		} else {
			setPostLikes(postLikes + 1);
			setPostLiked(true);
		}
		dispatch(likePost(postId));
	};

	const handleDeletePost = (postId) => {
		dispatch(deletePost(postId));
	};

	return (
		<>
			{post ? (
				<div className="d-flex justify-content-center w-100">
					<div style={{ width: "100%" }}>
						<Card.Header className="d-flex justify-content-between">
							<div>
								<img
									className="rounded-circle"
									src={userPicture}
									alt={userName}
									width="40"
									height="40"
								/>
								<Link to={`/${post.user._id}`} className="ml-2">
									{userName}
								</Link>
							</div>
							{post.user._id === user._id && (
								<div className="btn-group d-flex">
									<button
										className="btn btn-outline-secondary h-75"
										onClick={() =>
											(window.location.href = `/post/update/${post._id}`)
										}
									>
										<BiPencil />
									</button>
									<ModalBtn
										component={<BiTrash />}
										clickHandler={() => handleDeletePost(post._id)}
										styleBtn={"danger h-75"}
									></ModalBtn>
								</div>
							)}
						</Card.Header>
						<div>
							<Card.Title>{post.postInfo.description}</Card.Title>
							<div className="d-flex justify-content-end mb-2">
								<Card.Subtitle className="text-muted">
									{post.postInfo.gender},{" "}
									{changeToAge(post.postInfo.dateOfBirth)}
								</Card.Subtitle>
							</div>
							<Carousel className="row w-50  mx-auto">
								{post.images.map((image, index) => {
									return (
										<Carousel.Item key={index}>
											<img
												className="d-block w-100 mw-50"
												src={image.url}
												alt="First slide"
											/>
										</Carousel.Item>
									);
								})}
							</Carousel>

							<MedicalInfoPost postInfo={post.postInfo} />

							<div className="d-flex justify-content-end mt-2">
								<div className="btn-group">
									<div>
										<p className="fw-light fs-6 m-0 text-center text-muted">
											{comments.length}
										</p>
										<button
											type="button"
											className={`btn btn-${
												showCommentBox ? "primary" : "light"
											} mx-2 rounded-circle`}
											onClick={() => setShowCommentBox(!showCommentBox)}
										>
											<BiChat className="my-auto" />
										</button>
									</div>
									<div>
										<p className="fw-light fs-6 m-0 text-center text-muted">
											{postLikes}
										</p>
										<button
											type="button"
											className={`btn btn-${
												postLiked ? "success" : "light"
											} mx-2 rounded-circle`}
											onClick={() => handleLikePost(post._id)}
										>
											<BiLike className="my-auto" />
										</button>
									</div>
								</div>
							</div>
							{showCommentBox && (
								<Form className="my-2">
									<Form.Group>
										<Form.Control
											as="textarea"
											rows={3}
											value={newCommentText}
											onChange={handleNewCommentTextChange}
										/>
									</Form.Group>

									<Button
										variant="primary"
										onClick={() => handleAddComment({ key: 1 })}
									>
										Disgnosis
									</Button>
									<Button
										variant="primary mx-2"
										onClick={() => handleAddComment({ key: 2 })}
									>
										treatment Plan
									</Button>
								</Form>
							)}
							{comments &&
								comments.map((comment, index) => (
									<Comment
										key={index}
										comment={comment}
										comments={comments}
										setComments={setComments}
									/>
								))}
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default PostDetails;
