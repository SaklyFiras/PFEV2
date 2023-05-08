import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { FiEye, FiTrash } from "react-icons/fi";
import Nav from "../Formu&Nav/Nav";

import ModalBtn from "../layout/Model";

import MetaData from "../layout/metaData";
import Loading from "../routes/loading";
import {
	adminGetPosts,
	deletePostAdmin,
} from "../../redux/reducers/postReducer";

import { dateFormat } from "../user/userProfileDetails";

import { useDispatch, useSelector } from "react-redux";

const PostList = () => {
	const dispatch = useDispatch();

	const { loading, posts, deleted } = useSelector((state) => state.post.posts);

	useEffect(() => {
		dispatch(adminGetPosts());
	}, [deleted, dispatch]);

	const handleDeletePost = (id) => () => {
		dispatch(deletePostAdmin(id));
		window.location.reload();
	};

	const setPosts = () => {
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
				post_owner: <Link to={`/${post.user._id}`}>{post.user.name}</Link>,
				created_at: dateFormat(post.createdAt),

				actions: (
					<div className="row d-flex justify-content-center my-0">
						<div
							className="btn-group h-75"
							role="toolbar"
							aria-label="Toolbar with button groups"
						>
							<Link
								to={`/post/${post._id}?view=true`}
								className="btn btn-primary"
							>
								<FiEye />
							</Link>
							<ModalBtn
								component={<FiTrash />}
								clickHandler={handleDeletePost(post._id)}
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

export default PostList;
