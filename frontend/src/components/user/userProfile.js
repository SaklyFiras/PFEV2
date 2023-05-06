import React, { useState, useEffect } from "react";
import Nav from "../Formu&Nav/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Loading from "../routes/loading";
import { changeToAge } from "./userProfileDetails";
import MetaData from "../layout/metaData";
import ViewDetails from "./viewDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import {
	visitUser,
	addFollow,
	clearVisitErrors,
} from "../../redux/reducers/userReducers";
import { getUserPosts } from "../../redux/reducers/postReducer";
import { useDispatch } from "react-redux";
import Post from "../profile/Post";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

import {
	SiFacebook,
	SiInstagram,
	SiTwitter,
	SiYoutube,
	SiLinkedin,
} from "react-icons/si";

export function isValidUrl(urlString) {
	try {
		new URL(urlString);
		return true;
	} catch (error) {
		return false;
	}
}

const UserProfile = () => {
	const { posts, resPerPage, postsCount, loading } = useSelector(
		(state) => state.post.userPosts
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [followState, setFollowState] = useState(false);

	const { user } = useSelector((state) => state.user.auth);

	const [viewDetails, setViewDetails] = useState(false);
	const { visitedUser, success } = useSelector((state) => state.user.visit);
	const dispatch = useDispatch();
	const param = useParams();

	useEffect(() => {
		dispatch(visitUser(param.id));
		dispatch(getUserPosts(param.id, currentPage));
	}, [param, currentPage, dispatch]);
	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}

	useEffect(() => {
		if (success) {
			toast.success(success);
			setFollowState(!followState);
		}
		return () => {
			dispatch(clearVisitErrors());
		};
	}, [dispatch, success, followState]);

	useEffect(() => {
		if (visitedUser) {
			setFollowState(visitedUser.followers.includes(user._id));
		}
	}, [visitedUser, user._id]);

	const handleAddFollow = (id) => {
		dispatch(addFollow(id));
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<MetaData title="User Profile" />
					<Nav />

					{visitedUser && (
						<div className="container">
							<div className="row ">
								<div className="col-12 col-md-4  ">
									<div className="card ">
										<div className="card-body">
											<div className="d-flex flex-column align-items-center text-center">
												<img
													src={visitedUser.avatar.url}
													alt="User"
													className="rounded-circle"
													width="150"
												/>
												<div className="mt-3">
													<h4>{visitedUser.name}</h4>
													<p className="text-secondary mb-1">{`${visitedUser.status} | ${visitedUser.speciality}`}</p>
													<p className="text-muted font-size-sm">
														{changeToAge(visitedUser.birthDate)}
													</p>

													{param.id !== user._id && (
														<button
															onClick={() => handleAddFollow(visitedUser._id)}
															className="btn btn-primary"
														>
															{user && followState ? "Unfollow" : "Follow"}
														</button>
													)}
												</div>

												<div className="col mt-3">
													{isValidUrl(visitedUser.social.facebook) && (
														<a
															style={{ color: "#1197f5" }}
															href={visitedUser.social.facebook}
														>
															<SiFacebook className="mx-2" />
														</a>
													)}
													{isValidUrl(visitedUser.social.instagram) && (
														<a
															style={{ color: "#e11d45" }}
															href={visitedUser.social.instagram}
														>
															<SiInstagram className="mx-2" />
														</a>
													)}
													{isValidUrl(visitedUser.social.twitter) && (
														<a
															style={{ color: "#1d9bf0" }}
															href={visitedUser.social.twitter}
														>
															<SiTwitter className="mx-2" />
														</a>
													)}
													{isValidUrl(visitedUser.social.youtube) && (
														<a
															style={{ color: "red" }}
															href={visitedUser.social.youtube}
														>
															<SiYoutube className="mx-2" />
														</a>
													)}
													{isValidUrl(visitedUser.social.linkedin) && (
														<a
															style={{ color: "#0073b2" }}
															href={visitedUser.social.linkedin}
														>
															<SiLinkedin className="mx-2" />
														</a>
													)}
												</div>
												<small>{JSON.stringify(visitedUser.bio)}</small>
											</div>
										</div>
									</div>
									<div className="card ">
										<div className="card-body">
											<div className="row">
												<div className="col-sm-3">
													<h6 className="mb-0">Github Username</h6>
												</div>
												<div className="col-sm-9 text-secondary">
													{visitedUser.githubUsername}
												</div>
											</div>
											<hr />
											<div className="row">
												<div className="col-sm-3">
													<h6 className="mb-0">Skills</h6>
												</div>
												<div className="col-sm-9 text-secondary">
													{visitedUser.skills.map((skill, key) => (
														<span key={key} className="row">
															{skill}
														</span>
													))}
												</div>
											</div>
											<hr />
										</div>
										<button
											className="btn btn-link"
											onClick={() => setViewDetails(!viewDetails)}
										>
											{viewDetails ? "Hide Details" : "View Details"}
										</button>
									</div>
									<div className="card">
										<ul className="list-group list-group-flush">
											<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 className="mb-0">Followers</h6>
												<span className="text-secondary">
													{visitedUser && visitedUser.followers.length}
												</span>
											</li>
											<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 className="mb-0">Following</h6>
												<span className="text-secondary">
													{visitedUser && visitedUser.following.length}
												</span>
											</li>
											<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 className="mb-0">Likes</h6>
												<span className="text-secondary">
													{posts &&
														posts.reduce((acc, post) => {
															return acc + post.likes.length;
														}, 0)}
												</span>
											</li>
										</ul>
									</div>
								</div>
								{viewDetails ? (
									<ViewDetails />
								) : (
									<div className="col-sm-8 mb-3">
										<div className="card h-100">
											<div className="card-body">
												<h6 className="d-flex align-items-center justify-content-between mb-3">
													<i className="material-icons text-info mr-2">
														Recent Post
													</i>
													{param.id === user._id && (
														<a href="/post/add" className="btn btn-primary">
															ADD POST
														</a>
													)}
												</h6>

												<hr />
												{posts && posts.length === 0 ? (
													<div className="text-center">
														<h4>No Posts</h4>
													</div>
												) : (
													posts &&
													posts.map((post, key) => (
														<Link
															key={key}
															className="text-dark  text-decoration-none"
														>
															<Post post={post} />{" "}
														</Link>
													))
												)}
											</div>
											<div className="d-flex justify-content-center">
												{resPerPage <= postsCount && (
													<Pagination
														activePage={currentPage}
														itemsCountPerPage={resPerPage}
														totalItemsCount={postsCount}
														onChange={setCurrentPageNo}
														nextPageText={"Next"}
														prevPageText={"Prev"}
														firstPageText={"First"}
														lastPageText={"Last"}
														itemClass="page-item"
														linkClass="page-link"
													/>
												)}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default UserProfile;
