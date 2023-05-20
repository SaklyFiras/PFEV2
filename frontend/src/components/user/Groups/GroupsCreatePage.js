import React, { useState, useEffect } from "react";
import Nav from "../../Formu&Nav/Nav";
import MetaData from "../../layout/metaData";
import {
	createGroup,
	clearSuccess,
	clearErrors,
} from "../../../redux/reducers/groupsReducers";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GroupsCreatePage = () => {
	const navigate = useNavigate();
	const { success, error, loading } = useSelector((state) => state.group);
	const dispatch = useDispatch();
	const [_group, setGroup] = useState({
		name: "",
		description: "",
		tags: "",
	});
	const [imagePreview, setImagePreview] = useState();
	const [image, setImage] = useState();

	const handleFileChange = (event) => {
		const files = event.target.files;
		if (files.length !== 1) {
			alert("Please select exactly one image file.");
			return;
		}
		const file = files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result);
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const inputHandler = (e) => {
		setGroup({ ..._group, [e.target.name]: e.target.value });
	};
	const handleSubmitGroup = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set("name", _group.name);
		formData.set("description", _group.description);
		formData.set("tags", _group.tags);
		formData.set("image", image);
		dispatch(createGroup(formData));
	};
	useEffect(() => {
		if (success) {
			toast.success("Group created successfully");
			navigate("/groups");
		}
		if (error) {
			toast.error(error);
		}
		return () => {
			dispatch(clearSuccess());
			dispatch(clearErrors());
		};
	}, [success, error]);

	return (
		<>
			<Nav />
			<MetaData title={"Create a group"} />
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-8">
						<div className="card">
							<div className="card-header">
								<h4>Create a group</h4>
							</div>
							<div className="card-body">
								<form onSubmit={handleSubmitGroup}>
									<div className="mb-3">
										<label htmlFor="name" className="form-label">
											Group name
										</label>
										<input
											type="text"
											className="form-control"
											id="name"
											name="name"
											aria-describedby="name"
											value={_group.name}
											onChange={inputHandler}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="description" className="form-label">
											Group description
										</label>
										<textarea
											className="form-control"
											id="description"
											rows="3"
											name="description"
											value={_group.description}
											onChange={inputHandler}
											required
										></textarea>
									</div>
									<div className="mb-3">
										<label htmlFor="image" className="form-label">
											Group image
										</label>
										<input
											type="file"
											className="form-control"
											id="image"
											aria-describedby="image"
											accept="image/*"
											onChange={handleFileChange}
											required
										/>
										{imagePreview && (
											<img
												src={imagePreview}
												key={imagePreview}
												alt="avatar Preview"
												width="120"
												height="80"
												className="row mx-auto"
												required
											/>
										)}
									</div>
									<div className="mb-3">
										<label htmlFor="tags" className="form-label">
											Group tags
										</label>
										<input
											type="text"
											className="form-control"
											id="tags"
											value={_group.tags}
											onChange={inputHandler}
											name="tags"
											required
										/>
									</div>
									<div className="d-flex justify-content-end">
										<button type="submit" className="btn btn-primary">
											{loading ? (
												<div
													className="spinner-border d-grid mx-auto"
													role="status"
												></div>
											) : (
												"Create group"
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<div className="card">
							<div className="card-header">
								<h4>Group rules</h4>
							</div>
							<div className="card-body">
								<ul>
									<li>Be kind and courteous</li>
									<li>No hate speech or bullying</li>
									<li>No promotions or spam</li>
									<li>Respect everyone's privacy</li>
									<li>Respect everyone's opinions</li>
								</ul>
								<h6>Group rules are enforced by the group admins</h6>
								<hr />
								<h6>Group admins can:</h6>
								<ul>
									<li>Remove posts and comments</li>
									<li>Remove and block members</li>
									<li>Pin or unpin a post</li>
									<li>Approve or deny membership requests</li>
								</ul>
								<h6 className="text-danger">
									Once you create a group, you won't be able to change the group
									name, privacy or category.
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GroupsCreatePage;
