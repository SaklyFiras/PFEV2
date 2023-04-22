import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { FiEye, FiTrash } from "react-icons/fi";
import Nav from "../Formu&Nav/Nav";
import { toast, ToastContainer } from "react-toastify";
import ModalBtn from "../layout/Model";

import MetaData from "../layout/metaData";
import Loading from "../routes/loading";
import { getPosts, deletePostAdmin } from "../../redux/reducers/postReducer";

import { dateFormat } from "../user/userProfileDetails";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const PostList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, posts, deleted } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getPosts());
		
	}, [deleted]);

	const handleDeletePost = (id) => () => {
		dispatch(deletePostAdmin(id));
	};

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: "Post ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Title",
					field: "title",
					sort: "asc",
				},
				{
					label: "Description",
					field: "description",
					sort: "asc",
				},
				{
					label: "Post Owner",
					field: "post_owner",
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

		posts.forEach((post) => {
			data.rows.push({
				id: post._id,
				title: post.postInfo.title,
				description: post.postInfo.description,
				post_owner: (
					<Link  to={`/${post.user._id}`}>
						{post.user.name}
					</Link>
				),
				created_at: dateFormat(post.createdAt),

				actions: (
					<div className="row d-flex justify-content-center my-0">
						<div
							className="btn-toolbar d-flex justify-content-evenly"
							role="toolbar"
							aria-label="Toolbar with button groups"
						>
							<Link to={`/${post._id}`} className="btn btn-primary   h-75 w-25 ">
								<FiEye />
							</Link>
							<ModalBtn
								component={<FiTrash />}
								clickHandler={handleDeletePost(post._id)}
								styleBtn="danger"
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

			{posts && (
				<div className="row">
					<Nav />
					<div className="col-12 col-md-12">
						<Fragment>
							<h1 className="my-5">All Posts</h1>

							{loading ? (
								<Loading />
							) : (
								<MDBDataTable
									data={setUsers()}
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

export default PostList;
