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
import {
	getGroups,

} from "../../../redux/reducers/groupsReducers";
import GroupCard from "./GroupCard";
import GroupsJoined from "./GroupsJoined";

const GroupsWelcomePage = () => {
	const { user } = useSelector((state) => state.user.auth);
	const { groups, loading } = useSelector(
		(state) => state.group
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGroups());
	}, [dispatch]);

	const [joinGroup, setJoinGroup] = useState(false);
	return (
		<>
			<MetaData title={"Groups"} />
			<Nav />
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-8">
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
										type="search"
										placeholder="Insert Group name"
										aria-label="Search"
									/>
									<div className="col d-flex m-0 align-items-center gap-1 ms-1">
										<MdOutlineStarPurple500 className="btn btn-light btn-default p-0 m-0 w-100 h-75" />
										<MdOutlineUpdate className="btn btn-light p-0 m-0  w-100 h-75" />
										<MdOutlineListAlt className=" btn btn-light p-0 m-0  w-100 h-75" />
										<MdGroups2 className=" btn btn-light p-0 m-0  w-100 h-75" />
										<MdSupervisorAccount className="btn btn-light p-0 m-0  w-100 h-75" />
									</div>
								</div>
								{!loading &&
									groups.groups &&
									groups.groups.map((group) => {
										return <GroupCard key={group._id} group={group} />;
									})}
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<div className="card">
							<div className="card-header">
								<h4>Joined Groups</h4>
							</div>
							<div className="card-body">
								{!loading &&
									groups.groups &&
									groups.groups.map((group) => {
										return group.members.includes(user._id) ? (
											<GroupsJoined key={group._id} group={group} />
										) : null;
									})}
							</div>
						</div>
						<div className="card">
							<div className="card-header">
								<h4>My Groups</h4>
							</div>
							<div className="card-body">
								{!loading &&
									groups.groups &&
									groups.groups.map((group) => {
										return group.owner._id === user._id ? (
											<GroupsJoined key={group._id} group={group} />
										) : null;
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
