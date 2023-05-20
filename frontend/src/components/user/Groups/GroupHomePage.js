import React, { useState, useEffect } from "react";
import Nav from "../../Formu&Nav/Nav";
import MetaData from "../../layout/metaData";
import GroupNews from "./GroupNews";
import GroupMembers from "./GroupMembers";
import GroupPosts from "./GroupPosts";
import { MdLogout, MdSettings, MdAdd } from "react-icons/md";
import {
	getGroup,
	leaveGroup,
	clearErrors,
} from "../../../redux/reducers/groupsReducers";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RatingIcons } from "./GroupCard";
import GroupHomePageDetails from "./GroupHomePageDetails";
import GroupHomePageConfig from "./GroupHomePageConfig";
import GroupRequests from "./GroupRequests";
import GroupBlocked from "./GroupBlocked";
import RatingModal from "./GroupRating";
import { toast } from "react-toastify";
const GroupHomePage = () => {
	const [choiceState, setChoiceState] = useState("Members");
	const [showDetails, setShowDetails] = useState(true);
	const { user } = useSelector((state) => state.user.auth);
	const { group, error } = useSelector((state) => state.group);

	const dispatch = useDispatch();
	const { group_id } = useParams();
	useEffect(() => {
		dispatch(getGroup(group_id));
	}, [dispatch]);

	useEffect(() => {
		if (error === "You are not authorised to see this group") {
			window.history.back();
		}
		return () => {
			dispatch(clearErrors());
		};
	}, [error]);

	const handleLeaveGroup = () => {
		dispatch(leaveGroup(group_id));
		window.location.href = "/groups";
	};
	return (
		<>
			<Nav />
			{group.group && (
				<>
					<MetaData title={group.group.name} />
					<div className="container-fluid">
						<div className="row">
							<div className="d-flex">
								<div className="card flex-grow-1">
									<div className="card-body  gap-4  pb-0 mb-0">
										<div className="col-md-12 d-flex flex-wrap ">
											<div className="col-md-4">
												<div className="card h-100">
													<div className="card-header hstack">
														
															<h4 className="my-auto text-break">{group.group.name}</h4>
													

														<div className="d-flex gap-3 m-0">
															{group.group.owner._id === user._id ? (
																<button
																	className="btn btn-default"
																	onClick={() => setShowDetails(!showDetails)}
																>
																	<MdSettings size="25" className="my-auto" />
																</button>
															) : (
																<button
																	className="btn btn-default"
																	onClick={handleLeaveGroup}
																>
																	<MdLogout size="25" className="my-auto" />
																</button>
															)}
														</div>
													</div>
													<div className="d-flex justify-content-start card-body">
														<div className="d-flex flex-column">
															<img
																className="img-fluid rounded-circle"
																src={group.group.image.url}
																alt=""
																width="140"
															/>
															<div className="d-flex flex-row mx-auto">
																{group.group.ratings ? (
																	RatingIcons({ rating: group.group.ratings })
																) : (
																	<h6 className="m-0">No Rating</h6>
																)}
															</div>
															<RatingModal />
														</div>
														<div className="d-flex ms-5 flex-column">
															<p>
																Group members : {group.group.members.length}
															</p>
															<p>Group posts : {group.group.posts.length}</p>
														</div>
													</div>
												</div>
											</div>
											{showDetails ? (
												<GroupHomePageDetails group={group.group} />
											) : (
												<GroupHomePageConfig group={group.group} />
											)}
										</div>
									</div>

									<div className="col-md-12 ">
										<div className="d-flex flex-wrap mx-auto justify-content-center  gap-5 m-4">
											<button
												onClick={() => {
													setChoiceState("Members");
												}}
												className={`btn ${
													choiceState === "Members"
														? "border-bottom border-5"
														: "text-muted "
												}`}
											>
												Members{" "}
											</button>
											<button
												onClick={() => {
													setChoiceState("Posts");
												}}
												className={`btn ${
													choiceState === "Posts"
														? "border-bottom border-5"
														: "text-muted "
												}`}
											>
												Posts{" "}
											</button>
											<button
												onClick={() => {
													setChoiceState("News");
												}}
												className={`btn ${
													choiceState === "News"
														? "border-bottom border-5"
														: "text-muted "
												}`}
											>
												News{" "}
											</button>

											{group.group.owner._id === user._id && (
												<>
													<button
														onClick={() => {
															setChoiceState("Requests");
														}}
														className={`btn ${
															choiceState === "Requests"
																? "border-bottom border-5"
																: "text-muted "
														}`}
													>
														Requests{" "}
													</button>
													<button
														onClick={() => {
															setChoiceState("Blocked");
														}}
														className={`btn ${
															choiceState === "Blocked"
																? "border-bottom border-5"
																: "text-muted "
														}`}
													>
														Blocked{" "}
													</button>
												</>
											)}
										</div>
										<div className="card">
											<div className="d-flex justify-content-evenly  mb-5 mt-2">
												<h2 className="mx-5">{choiceState}</h2>
												{choiceState === "Posts" && (
													<Link
														to={`/post/add/group/${group.group._id}`}
														className="btn btn-primary mb-3"
													>
														<MdAdd size="25" className="my-auto" />
														ADD POST
													</Link>
												)}
											</div>

											{choiceState === "Members" &&
												group.group.members.map((member) => {
													return (
														<GroupMembers member={member} key={member._id} />
													);
												})}
											{choiceState === "Posts" &&
												group.group.posts.map((post) => {
													return <GroupPosts post={post} key={post._id} />;
												})}
											{choiceState === "News" &&
												group.group.news.map((_new) => {
													return <GroupNews _new={_new} key={_new} />;
												})}

											{choiceState === "Requests" &&
												group.group.joinRequests.map((request) => {
													return (
														<GroupRequests request={request} key={request} />
													);
												})}
											{choiceState === "Blocked" &&
												group.group.blockedUsers.map((blocked) => {
													return (
														<GroupBlocked blocked={blocked} key={blocked} />
													);
												})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default GroupHomePage;
