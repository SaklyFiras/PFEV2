import React, { useState, useEffect } from "react";
import Nav from "../../Formu&Nav/Nav";
import MetaData from "../../layout/metaData";
import {
	MdOutlineUpdate,
	MdOutlineStarPurple500,
	MdGroups2,
	MdOutlineListAlt,
	MdSupervisorAccount,
} from "react-icons/md";
import { Link } from "react-router-dom";
import JoinGroup from "./JoinGroup";
import { useSelector, useDispatch } from "react-redux";
import { getGroups } from "../../../redux/reducers/groupsReducers";
import GroupCard from "./GroupCard";
import GroupsJoined from "./GroupsJoined";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

const GroupsWelcomePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [filter, setFilter] = useState("rating");
	const [keyword, setkeyword] = useState("");
	const [joinGroup, setJoinGroup] = useState(false);
	const { error, message } = useSelector((state) => state.group);
	const { resPerPage, filtredGroups, groupsCount } = useSelector(
		(state) => state.group.groups
	);
	const { groups, group, loading } = useSelector((state) => state.group);

	const dispatch = useDispatch();
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			dispatch(getGroups(currentPage, filter, keyword));
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [dispatch, keyword, filter, currentPage]);
	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (message) {
			toast.success(message);
		}
		if (message === "You are now a member of this group") {
			window.location.href = `/groups/${group.group._id}`;
		}
	}, [error, message]);

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}
	let count = groupsCount;
	if (keyword !== "" || filter === "fallowing") {
		count = filtredGroups;
	}
	return (
		<>
			<MetaData title={"Groups"} />
			<Nav />
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-10">
						<div className="card">
							<div className="card-header">
								<h4>Groups</h4>
							</div>
							<div className="card-body">
								<div className="d-flex justify-content-around text-center">
									<div className="col-md-6">
										<p className="card-text fw-bold">
											Join a group to share your opinion
										</p>
										<button
											onClick={() => setJoinGroup(!joinGroup)}
											className="btn btn-outline-primary"
										>
											Join a group
										</button>
									</div>

									{joinGroup ? (
										<JoinGroup />
									) : (
										<div className="col-md-6">
											<p className="card-text fw-bold">
												Create a group to share ideas and passions
											</p>
											<Link
												to="/groups/create"
												className="btn btn-outline-primary"
											>
												Create a group
											</Link>
										</div>
									)}
								</div>
								<hr />
								<div className="d-flex">
									<input
										className="form-control w-75"
										type="keyword"
										placeholder="Insert Group name"
										aria-label="Search"
										value={keyword}
										onChange={(e) => setkeyword(e.target.value)}
									/>
									<div className="col d-flex m-0 align-items-center gap-1 ms-1">
										<OverlayTrigger
											overlay={
												<Tooltip className="m-0" id="tooltip-Rating">
													Sort by Rating
												</Tooltip>
											}
										>
											<Button
												variant={`${
													filter === "rating"
														? "secondary text-warning"
														: "outline-secondary"
												} p-1 `}
												onClick={() => setFilter("rating")}
											>
												<MdOutlineStarPurple500 className="my-auto" size="25" />
											</Button>
										</OverlayTrigger>
										<OverlayTrigger
											overlay={
												<Tooltip className="m-0" id="tooltip-Date">
													Sort by Date
												</Tooltip>
											}
										>
											<Button
												variant={`${
													filter === "date"
														? "secondary text-warning"
														: "outline-secondary"
												} p-1 `}
												onClick={() => setFilter("date")}
											>
												<MdOutlineUpdate className="my-auto" size="25" />
											</Button>
										</OverlayTrigger>
										<OverlayTrigger
											overlay={
												<Tooltip className="m-0" id="tooltip-disabled">
													Sort by Posts
												</Tooltip>
											}
										>
											<Button
												variant={`${
													filter === "posts"
														? "secondary text-warning"
														: "outline-secondary"
												} p-1 `}
												onClick={() => setFilter("posts")}
											>
												<MdOutlineListAlt className="my-auto" size="25" />
											</Button>
										</OverlayTrigger>
										<OverlayTrigger
											overlay={
												<Tooltip className="m-0" id="tooltip-members">
													Sort by Members
												</Tooltip>
											}
										>
											<Button
												variant={`${
													filter === "members"
														? "secondary text-warning"
														: "outline-secondary"
												} p-1 `}
												onClick={() => setFilter("members")}
											>
												<MdGroups2 className="my-auto" size="25" />
											</Button>
										</OverlayTrigger>
										<OverlayTrigger
											overlay={
												<Tooltip className="m-0" id="tooltip-followers">
													Sort by your Fallowing
												</Tooltip>
											}
										>
											<Button
												variant={`${
													filter === "fallowing"
														? "secondary text-warning"
														: "outline-secondary"
												} p-1 `}
												onClick={() => setFilter("fallowing")}
											>
												<MdSupervisorAccount className="my-auto" size="25" />
											</Button>
										</OverlayTrigger>
									</div>
								</div>
								{!loading ? (
									groups.groups &&
									groups.groups.map((group) => {
										return <GroupCard key={group._id} group={group} />;
									})
								) : (
									<div
										className="spinner-border d-grid mx-auto"
										role="status"
									></div>
								)}
							</div>
							{resPerPage <= count && (
								<div className="d-flex justify-content-center mt-5">
									<Pagination
										activePage={currentPage}
										itemsCountPerPage={resPerPage}
										totalItemsCount={groupsCount}
										onChange={setCurrentPageNo}
										nextPageText={"Next"}
										prevPageText={"Prev"}
										firstPageText={"First"}
										lastPageText={"Last"}
										itemClass="page-item"
										linkClass="page-link"
									/>
								</div>
							)}
						</div>
					</div>
					<div className="col-12 col-sm-2">
						<div className="card h-50">
							<div className="card-header">
								<h4>
									Joined Groups (
									{groups.joinedGroups && groups.joinedGroups.length})
								</h4>
							</div>
							<div className="card-body overflow-auto p-1">
								{groups.joinedGroups &&
									groups.joinedGroups.map((group) => {
										return <GroupsJoined key={group._id} group={group} />;
									})}
							</div>
						</div>
						<div className="card h-50">
							<div className="card-header">
								<h4>
									My Groups ({groups.ownedGroups && groups.ownedGroups.length})
								</h4>
							</div>
							<div className="card-body overflow-auto p-1">
								{groups.ownedGroups &&
									groups.ownedGroups.map((group) => {
										return <GroupsJoined key={group._id} group={group} />;
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GroupsWelcomePage;
