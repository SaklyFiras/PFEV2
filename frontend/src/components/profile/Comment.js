import React, { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import {
	likeComment,
	dislikeComment,
	updateComment,
} from "../../redux/reducers/commentReducers";
import { useDispatch, useSelector } from "react-redux";

import { BiDislike, BiLike } from "react-icons/bi";
import { dateFormat } from "../user/userProfileDetails";
import ModalBtn from "../layout/Model";
import { BiTrash, BiPencil } from "react-icons/bi";
import { deleteComment } from "../../redux/reducers/commentReducers";

function formatDateDifference(updatedAt) {
	const dateNow = new Date();
	const updatedDate = new Date(updatedAt);
	const diffInMillis = dateNow - updatedDate;
	
	const diffInSeconds = Math.round(diffInMillis / 1000);
	const diffInMinutes = Math.round(diffInSeconds / 60);
	const diffInHours = Math.round(diffInMinutes / 60);
	const diffInDays = Math.round(diffInHours / 24);
	const diffInMonths = Math.round(diffInDays / 30);
	const diffInYears = Math.round(diffInDays / 365);
	
	if (diffInSeconds < 60) {
	  return "just now";
	} else if (diffInMinutes < 60) {
	  return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
	} else if (diffInHours < 24) {
	  return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
	} else if (diffInDays < 30) {
	  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
	} else if (diffInMonths < 12) {
	  return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
	} else {
	  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
	}
  }
  

const Comment = ({ comment, comments, setComments }) => {
	const { user } = useSelector((state) => state.user.auth);
	const { updated} = useSelector((state) => state.comment);
	
	const dispatch = useDispatch();
	const [likes, setLikes] = useState(comment.likes.length);
	const [dislikes, setDislikes] = useState(comment.dislikes.length);
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [content, setContent] = useState(comment.content);
	const [edit, setEdit] = useState(false);

	const onContentChange = React.useCallback((evt) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] },
		};

		setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
	}, []);

	const handleLikeComment = (commentID) => {
		if (!liked && !disliked) {
			setLikes(likes + 1);
			setLiked(true);
			dispatch(likeComment(commentID));
		} else if (disliked) {
			setLikes(likes + 1);
			setLiked(true);
			setDislikes(dislikes - 1);
			setDisliked(false);
			dispatch(likeComment(commentID));
		} else if (liked) {
			setLikes(likes - 1);
			setLiked(false);
		}
	};
	const handleDislikeComment = (commentID) => {
		if (!liked && !disliked) {
			setDislikes(dislikes + 1);
			setDisliked(true);
			dispatch(dislikeComment(commentID));
		} else if (liked) {
			setDislikes(dislikes + 1);
			setDisliked(true);
			setLikes(likes - 1);
			setLiked(false);
			dispatch(dislikeComment(commentID));
		} else if (disliked) {
			setDislikes(dislikes - 1);
			setDisliked(false);
		}
	};

	useEffect(() => {
		comment.likes.map((like) => {
			if (like._id === user._id) {
				setLiked(true);
			}
			return 0;
		});
		comment.dislikes.map((dislike) => {
			if (dislike._id === user._id) {
				setDisliked(true);
			}
			return 0;
		});
	}, [comment.likes, comment.dislikes, user._id, updated]);

	const handleDeleteComment = (commentID) => {
		dispatch(deleteComment(commentID));
		setComments(comments.filter((comment) => comment._id !== commentID));
		window.location.reload();
	};

	const handleUpdateComment = (commentID, content) => {
		dispatch(updateComment(commentID, content));
		setEdit(!edit);
	};

	return (
		<div className="card my-2">
			<div className="card-header d-flex justify-content-between align-items-center">
				<div className="m-0">
					<img
						className="rounded-circle"
						src={comment.user.avatar.url}
						alt={comment.user.name}
						width="40"
						height="40"
					/>
					<span className="ml-2">{comment.user.name}
				
					</span>
				</div>
				<div>
					{comment.user._id === user._id && (
						<div className="d-flex  btn-group">
							{edit && (
								<button
									onClick={() => handleUpdateComment(comment._id, content)}
									className="btn"
								>
									save
								</button>
							)}
							<button onClick={() => setEdit(!edit)} className="btn">
								<BiPencil />
							</button>
							<ModalBtn
								component={<BiTrash />}
								styleBtn="btn"
								clickHandler={() => handleDeleteComment(comment._id)}
							></ModalBtn>
						</div>
					)}
				</div>
			</div>
			<div className="card-body pb-0">
				<ContentEditable
					onChange={onContentChange}
					onBlur={onContentChange}
					html={content || ""}
					disabled={!(edit || comment.user._id !== user._id)}
				/>
			</div>
			<div className="card-footer py-0 d-flex justify-content-end mt-2 w-auto border-0 bg-body">
				<div className="btn-group">
					<div>
						<p className="fw-light fs-6 m-0 text-center text-muted">{likes}</p>
						<button
							type="button"
							className={`btn btn-${
								liked ? "success" : "light"
							} mx-2 rounded-circle`}
							onClick={() => handleLikeComment(comment._id)}
						>
							<BiLike className="my-auto" />
						</button>
					</div>
					<div>
						<p className="fw-light fs-6 m-0 text-center text-muted">
							{dislikes}
						</p>
						<button
							type="button"
							className={`btn btn-${
								disliked ? "danger" : "light"
							} mx-2 rounded-circle`}
							onClick={() => handleDislikeComment(comment._id)}
						>
							<BiDislike className="my-auto" />
						</button>
					</div>
				</div>
			</div>
			<div className="d-flex  justify-content-between m-0 bg-secondary bg-opacity-10">
				<small className="">
					{dateFormat(comment.createdAt)}
					{comment.updatedAt  && (
						<span className="text-muted">
							
							{` edited ${formatDateDifference(comment.updatedAt)}`}
						</span>
					)}
					{edit && <span className="text-muted"> (edit mode)</span>}
				</small>
				<p className="p-0 m-0 fw-bold font-monospace text-decoration-underline">
					{comment.commentType}
				</p>
			</div>
		</div>
	);
};

export default Comment;
