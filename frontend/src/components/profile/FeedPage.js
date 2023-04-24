import Nav from "../Formu&Nav/Nav";

import Post from "./Post";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/reducers/postReducer";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../../constants/globalConstants";

import Pagination from "react-js-pagination";

function FeedPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useDispatch();

	const { postsCount, resPerPage, posts } = useSelector(
		(state) => state.post.posts
	);
	const [filter, setFilter] = useState("date");
	const [keyword, setKeyword] = useState("");

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}

	useEffect(() => {
		dispatch(getPosts(currentPage, keyword, filter));
	}, [currentPage, keyword, filter, dispatch]);
	return (
		<>
			<Nav />

			<div className="container-fluid">
				<div className="col-12 ">
					<div className="row d-flex">
						<div className="col-sm-2  border">
							<h4>Filter by:</h4>
							<div className="row text-left   mt-5 ">
								<div className=" form-check">
									<input
										className="form-check-input mx-2"
										type="radio"
										name="exampleRadios"
										id="exampleRadios1"
										value="date"
										defaultChecked
										onChange={(e) => {
											setFilter(e.target.value);
										}}
									/>
									<label className="form-check-label" htmlFor="exampleRadios1">
										Date
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input mx-2"
										type="radio"
										name="exampleRadios"
										id="exampleRadios2"
										value="likes"
										onChange={(e) => {
											setFilter(e.target.value);
										}}
									/>
									<label className="form-check-label" htmlFor="exampleRadios2">
										Likes
									</label>
								</div>
							</div>
						</div>
						<div className="col-sm-10">
							<div className="d-flex justify-content-center">
								<div className="container-fluid">
									<form className="d-flex" role="search">
										<input
											className="form-control me-2"
											type="search"
											placeholder="Search by title"
											aria-label="Search"
											onChange={(e) => setKeyword(e.target.value)}
										/>
									</form>
								</div>
							</div>
							{posts &&
								posts.map((post) => (
									<Link
										className="text-dark  text-decoration-none"
										to={`/post/${post._id}`}
										key={post._id}
										replace
									>
										<Post post={post} />
									</Link>
								))}
						</div>
					</div>
				</div>
			</div>
			{resPerPage <= postsCount && (
				<div className="d-flex justify-content-center mt-5">
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
				</div>
			)}
		</>
	);
}
export default FeedPage;
