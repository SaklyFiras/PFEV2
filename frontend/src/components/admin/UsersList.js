import React, { Fragment, useEffect } from "react";
import { Link} from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { FiEye, FiTrash } from "react-icons/fi";
import Nav from "../Formu&Nav/Nav";
import ModalBtn from "../layout/Model";

import MetaData from "../layout/metaData";
import Loading from "../routes/loading";
import {
	adminDeleteUser,
	adminGetAllUsers,
} from "../../redux/reducers/userReducers";
import { dateFormat } from "../user/userProfileDetails";

import { useDispatch, useSelector } from "react-redux";

const UsersList = () => {
	const dispatch = useDispatch();
	

	const { loading,  success, users } = useSelector(
		(state) => state.user.admin
	);
	

	useEffect(() => {
		dispatch(adminGetAllUsers());
		
	}, [success,dispatch]);

	const handleDeleteUser = (id) => () => {
		dispatch(adminDeleteUser(id));
	};

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: "User ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Name",
					field: "name",
					sort: "asc",
				},
				{
					label: "Email",
					field: "email",
					sort: "asc",
				},
				{
					label: "Status",
					field: "status",
					sort: "asc",
				},
				{
					label: "Role",
					field: "role",
					sort: "asc",
				},
				{
					label: "Verified",
					field: "verified",
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

		users.forEach((user) => {
			data.rows.push({
				id: user._id,
				name: user.name,
				email: user.email,
				status: user.status,
				role: user.role,
				verified: user.verified? "Yes" : "No" ,
				created_at: dateFormat(user.createdAt),

				actions: (
					<div className="row d-flex justify-content-center my-0">
						<div
							className="btn-group h-75"
							role="toolbar"
							aria-label="Toolbar with button groups"
						>
							<Link to={`/${user._id}`} className="btn btn-primary">
								<FiEye />
							</Link>
							<ModalBtn
								component={<FiTrash />}
								clickHandler={handleDeleteUser(user._id)}
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

			{users && (
			
					<div className="row">
					<Nav />
						<div className="col-12 col-md-12">
							<Fragment>
								<h1 className="my-5">All Users</h1>

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

export default UsersList;
