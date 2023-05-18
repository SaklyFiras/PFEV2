import React, { Fragment } from "react";
import Nav from "../Formu&Nav/Nav";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import {  useSelector } from "react-redux";
import Loading from "../routes/loading";

const DashBoard = () => {

	const {  loading } = useSelector((state) => state.user.auth);
	return (
		<Fragment>
			{loading ? (
				<Loading />
			) : (
				<>
					<Nav />
					<div className="row mx-auto">
						<div className="col-12 col-md-12">
							<h1 className="my-4">Dashboard</h1>

							<Fragment>
								<MetaData title={"Admin Dashboard"} />

								

								<div className="row pr-4">
									<div className="col-xl-3 col-sm-6 mb-3">
										<div className="card text-white bg-success o-hidden h-100">
											<div className="card-body">
												<div className="text-center card-font-size">
													Posts
												</div>
											</div>
											<Link
												className="card-footer text-white clearfix small z-1"
												to="/admin/posts"
											>
												<span className="float-left">View Details</span>
												<span className="float-right">
													<i className="fa fa-angle-right"></i>
												</span>
											</Link>
										</div>
									</div>

									

									<div className="col-xl-3 col-sm-6 mb-3">
										<div className="card text-white bg-info o-hidden h-100">
											<div className="card-body">
												<div className="text-center card-font-size">Users</div>
											</div>
											<Link
												className="card-footer text-white clearfix small z-1"
												to="/admin/users"
											>
												<span className="float-left">View Details</span>
												<span className="float-right">
													<i className="fa fa-angle-right"></i>
												</span>
											</Link>
										</div>
									</div>

									<div className="col-xl-3 col-sm-6 mb-3">
										<div className="card text-white bg-danger o-hidden h-100">
											<div className="card-body">
												<div className="text-center card-font-size">Groups</div>
											</div>
											<Link
												className="card-footer text-white clearfix small z-1"
												to="/admin/groups"
											>
												<span className="float-left">View Details</span>
												<span className="float-right">
													<i className="fa fa-angle-right"></i>
												</span>
											</Link>
										</div>
									</div>

									<div className="col-xl-3 col-sm-6 mb-3">
										<div className="card text-white bg-warning o-hidden h-100">
											<div className="card-body">
												<div className="text-center card-font-size">
													Analytics
												</div>
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						</div>
					</div>
				</>
			)}
		</Fragment>
	);
};

export default DashBoard;
