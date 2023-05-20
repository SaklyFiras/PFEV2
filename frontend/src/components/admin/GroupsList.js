import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { FiEye, FiTrash } from "react-icons/fi";
import Nav from "../Formu&Nav/Nav";

import ModalBtn from "../layout/Model";

import MetaData from "../layout/metaData";
import Loading from "../routes/loading";
import {
	adminGetAllGroups,
    adminDeleteGroup,
	clearErrors
} from "../../redux/reducers/groupsReducers";

import { dateFormat } from "../user/userProfileDetails";

import { useDispatch, useSelector } from "react-redux";

const GroupsList = () => {
	const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.group);
	const {groups} = useSelector((state) => state.group.groups);

	useEffect(() => {
		dispatch(adminGetAllGroups());
		

	}, []);

	const handleDeletePost = (id) => () => {
		dispatch(adminDeleteGroup(id));
		window.location.reload();
	};

	const setPosts = () => {
		const data = {
			columns: [
				{
					label: "Group ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Name",
					field: "name",
					sort: "asc",
				},
				{
					label: "Description",
					field: "description",
					sort: "asc",
				},
                {
					label: "Members",
					field: "members",
					sort: "asc",
				},
                {
					label: "Posts",
					field: "posts",
					sort: "asc",
				},
				{
					label: "Group Owner",
					field: "Group_Owner",
					sort: "asc",
				},
                {
					label: "Rating",
					field: "rating",
					sort: "asc",
				},
				{
					label: "Created At",
					field: "created_at",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
				},
			],
			rows: [],
		};

		groups.forEach((group) => {
			data.rows.push({
				id: group._id,
				name: group.name,
                posts : group.posts.length,
                members : group.members.length,
                // rating : group.ratings.reduce((acc, item) => acc + item.rating, 0) / group.ratings.length,
				description: group.description,
				Group_Owner: <Link to={`/${group.owner._id}`}>{group.owner.name}</Link>,
				created_at: dateFormat(group.createdAt),

				actions: (
					<div className="row d-flex justify-content-center my-0">
						<div
							className="btn-group h-75"
							role="toolbar"
							aria-label="Toolbar with button groups"
						>
							<Link
								to={`/groups/${group._id}`}
								className="btn btn-primary"
							>
								<FiEye />
							</Link>
							<ModalBtn
								component={<FiTrash />}
								clickHandler={handleDeletePost(group._id)}
								styleBtn="danger h-75"
							></ModalBtn>
						</div>
					</div>
				),
			});
		});

		return data;
	};

	return (
		<Fragment>
			<MetaData title={"All Users"} />

			{groups && (
				<div className="row">
					<Nav />
					<div className="col-12 col-md-12">
						<Fragment>
							<h1 className="my-5">All Posts</h1>

							{loading ? (
								<Loading />
							) : (
								<MDBDataTable
									data={setPosts()}
									className="px-3"
									bordered
									striped
									hover
								/>
							)}
						</Fragment>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default GroupsList;
