import Nav from "../Formu&Nav/Nav";
import Post from "./Post";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/reducers/postReducer";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import MetaData from "../layout/metaData";

const filterFormat = (filter) => {
	let NewFilter = "";
	for (let key in filter) {
		if (filter[key] !== "all" && filter[key] !== 121) {
			NewFilter += `${key}:${filter[key]};`;
		}
	}
	NewFilter = NewFilter.slice(0, -1);
	return NewFilter;
};
const keywordFormat = (category, keyword) => {
	if (category === "all") {
		return "";
	}
	const newKeyword = `${category}:${keyword}`;
	return newKeyword;
};

function FeedPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [category, setcategory] = useState("all");
	const [keyword, setKeyword] = useState("");
	const dispatch = useDispatch();

	const { postsCount, resPerPage, filtredPostsCount, posts } = useSelector(
		(state) => state.post.posts
	);
	const { loading } = useSelector((state) => state.post);
	const [filter, setFilter] = useState({
		sortBy: "date",
		location: "all",
		speciality: "all",
		status: "all",
		age: 121,
	});

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const view = urlParams.get("view");
		if (!view) {
			const delayDebounceFn = setTimeout(() => {
				const newKeyword = keywordFormat(category, keyword);
				const NewFilter = filterFormat(filter);
				dispatch(getPosts(currentPage, newKeyword, JSON.stringify(NewFilter)));
			}, 1000);

			return () => clearTimeout(delayDebounceFn);
		}
	}, [keyword, currentPage, filter]);
	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}

	const handleFilter = (e) => {
		if (currentPage !== 1) {
			setCurrentPage(1);
		}

		setFilter({ ...filter, [e.target.name]: e.target.value });
	};
	const handleKeyword = (e) => {
		if (currentPage !== 1) {
			setCurrentPage(1);
		}
		if (category !== "all") {
			setKeyword(e.target.value);
		}
	};

	const handleCategoryChange = (e) => {
		setKeyword("");
		setcategory(e.target.value);
	};
	let count = postsCount;

	if (
		keyword !== "" ||
		filter.status !== "all" ||
		filter.speciality !== "all" ||
		filter.location !== "all" ||
		filter.age !== "all"
	) {
		count = filtredPostsCount;
	}
	return (
		<>
			<MetaData title={"Feedpage"} />
			<Nav />

			<div className="container-fluid">
				<div className="col-12 ">
					<div className="row d-flex">
						<div className="col-sm-2 border">
							<h4>Sort By:</h4>
							<div className="row text-left  mt-5 ">
								<div className=" form-check">
									<input
										className="form-check-input mx-2"
										type="radio"
										name="sortBy"
										id="exampleRadios1"
										value="date"
										defaultChecked
										onChange={handleFilter}
									/>
									<label className="form-check-label" htmlFor="exampleRadios1">
										Date
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input mx-2"
										type="radio"
										name="sortBy"
										id="exampleRadios2"
										value="likes"
										onChange={handleFilter}
									/>
									<label className="form-check-label" htmlFor="exampleRadios2">
										Likes
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input mx-2"
										type="radio"
										name="sortBy"
										id="exampleRadios3"
										value="comments"
										onChange={handleFilter}
									/>
									<label className="form-check-label" htmlFor="exampleRadios3">
										Comments
									</label>
								</div>
								<h4>Search By:</h4>
								<label htmlFor="exampleDataList" className="form-label mt-4">
									Location :
								</label>
								<select
									className="form-select w-75 mx-2"
									aria-label="Default select example"
									name="location"
									onChange={handleFilter}
									value={filter.location}
								>
									<option value="all">all</option>
									<option value="Ariana">Ariana</option>
									<option value="Beja">Beja</option>
									<option value="Ben Arous">Ben Arous</option>
									<option value="Bizerte">Bizerte</option>
									<option value="Gabes">Gabes</option>
									<option value="Gafsa">Gafsa</option>
									<option value="Jendouba">Jendouba</option>
									<option value="Kairouan">Kairouan</option>
									<option value="Kasserine">Kasserine</option>
									<option value="Kebili">Kebili</option>
									<option value="Kef">Kef</option>
									<option value="Mahdia">Mahdia</option>
									<option value="Manouba">Manouba</option>
									<option value="Medenine">Medenine</option>
									<option value="Monastir">Monastir</option>
									<option value="Nabeul">Nabeul</option>
									<option value="Sfax">Sfax</option>
									<option value="Sidi Bouzid">Sidi Bouzid</option>
									<option value="Siliana">Siliana</option>
									<option value="Sousse">Sousse</option>
									<option value="Tataouine">Tataouine</option>
									<option value="Tozeur">Tozeur</option>
									<option value="Tunis">Tunis</option>
									<option value="Zaghouan">Zaghouan</option>
								</select>
								<label htmlFor="exampleDataList" className="form-label mt-4">
									Speciality :
								</label>
								<select
									className="form-select w-75 mx-2"
									aria-label="Default select example"
									name="speciality"
									onChange={handleFilter}
									value={filter.speciality}
								>
									<option value="all">all</option>
									<option value="Dental Anesthesiology">
										Dental Anesthesiology
									</option>
									<option value="Dental Public Health">
										Dental Public Health
									</option>
									<option value="Endodontics">Endodontics</option>
									<option value="Oral And Maxillo facial Pathology">
										Oral And Maxillofacial Pathology
									</option>
									<option value="Oral And Maxillo facial Radiology">
										Oral And Maxillofacial Radiology
									</option>
									<option value="Oral And Maxillo facial Surgery">
										Oral And Maxillofacial Surgery
									</option>
									<option value="Oral Medicine">Oral Medicine</option>
									<option value="Orofacial Pain">Orofacial Pain</option>
									<option value="Orthodontics">Orthodontics</option>
									<option value="Dentofacial Orthopedics">
										Dentofacial Orthopedics
									</option>
									<option value="Pediatric Dentistry">
										Pediatric Dentistry
									</option>
									<option value="Periodontics">Periodontics</option>
									<option value="Prosthodontics">Prosthodontics</option>
									<option value="Dental Hygiene">Dental Hygiene</option>
								</select>
								<label htmlFor="exampleDataList" className="form-label mt-4">
									Status :
								</label>
								<select
									className="form-select w-75 mx-2"
									aria-label="Default select example"
									name="status"
									onChange={handleFilter}
									value={filter.status}
								>
									<option value="all">all</option>
									<option value="Dentist">Dentist</option>
									<option value="Student">Dental Student</option>
									<option value="Expert">Expert</option>
									<option value="Professor">Professor</option>
								</select>
								<label htmlFor="exampleDataList" className="form-label mt-4">
									patient Age :{" "}
									{filter.age > 120 ? "ALL" : `<${filter.age - 1}`}
								</label>
								<input
									min={1}
									max={121}
									step={10}
									onChange={handleFilter}
									className="form-range w-75 mx-2"
									name="age"
									type="range"
									value={filter.age}
								/>
							</div>
						</div>
						<div className="col-sm-10">
							<form className="d-flex " role="search">
								<select
									className="form-select w-25 me-2"
									aria-label="Default select example"
									onChange={handleCategoryChange}
								>
									<option value="all">all</option>
									<option value="Title">Post Title</option>
									<option value="Author">Post owner</option>
									<option value="Reference">Patient Reference</option>
								</select>
								<input
									className="form-control"
									type="search"
									placeholder="What are you looking for ?"
									aria-label="Search"
									onChange={handleKeyword}
									value={keyword}
								/>
							</form>

							{loading ? (
								<div
									className="spinner-border d-grid mx-auto"
									role="status"
								></div>
							) : (
								posts &&
								posts.map((post) => (
									<Link
										className="text-dark  text-decoration-none"
										to={`/post/${post._id}`}
										key={post._id}
										replace
									>
										<Post post={post} />
									</Link>
								))
							)}
						</div>
					</div>
				</div>
			</div>
			{resPerPage <= count && (
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
