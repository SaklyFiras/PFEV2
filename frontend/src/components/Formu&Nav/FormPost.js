import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import {
	createPost,
	getPost,
	updatePost,
} from "../../redux/reducers/postReducer";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validatePostInfo } from "./postErrorHandler";

import { dateFormat } from "../user/userProfileDetails";
import MetaData from "../layout/metaData";

function FormPost() {
	const { loading, success } = useSelector((state) => state.post);
	const post = useSelector((state) => state.post.post);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const param = useParams();
	const [currentStep, setCurrentStep] = useState(1);

	const [formState, setFormState] = useState({
		bloodPressure: "",
		dailyMedications: "",
		dateOfBirth: "",
		deglutitionAtypique: false,
		deglutitionTypique: false,
		dentalHistory: "",
		dermato: "",
		description: "",
		detailsDeglutition: "",
		detailsMastication: "",
		detailsRespiration: "",
		examenAtmAutre: "",
		examenAtmAutreExplanation: "",
		examenAtmClaquement: "",
		examenAtmDouleur: false,
		examenAtmNormal: "",
		examenExoBuccal: "",
		extraoralExamination: "",
		gender: "",
		intraoralExamination: "",
		masticationBilateral: false,
		masticationUnilateral: false,
		medicalHistory: "",
		patientReference: "",
		pulse: "",
		reasonConsultation: "",
		respiration: "",
		respirationBuccal: false,
		respirationMixte: false,
		respirationNasal: false,
		symetrie: false,
		symetrieExplanation: "",
		title: "",
	});

	const handleChange = (event) => {
		const { name, value, type, checked, id } = event.target;
		if (name === "respiration") {
			if (id === "respirationBuccal") {
				setFormState((prevState) => ({
					...prevState,
					respirationBuccal: true,
				}));
				setFormState((prevState) => ({
					...prevState,
					respirationMixte: false,
				}));
				setFormState((prevState) => ({
					...prevState,
					respirationNasal: false,
				}));
			}
			if (id === "respirationMixte") {
				setFormState((prevState) => ({
					...prevState,
					respirationBuccal: false,
				}));
				setFormState((prevState) => ({ ...prevState, respirationMixte: true }));
				setFormState((prevState) => ({
					...prevState,
					respirationNasal: false,
				}));
			}
			if (id === "respirationNasal") {
				setFormState((prevState) => ({
					...prevState,
					respirationBuccal: false,
				}));
				setFormState((prevState) => ({
					...prevState,
					respirationMixte: false,
				}));
				setFormState((prevState) => ({ ...prevState, respirationNasal: true }));
			}
		}
		if (name === "mastication") {
			if (id === "masticationBilateral") {
				setFormState((prevState) => ({
					...prevState,
					masticationBilateral: true,
				}));
				setFormState((prevState) => ({
					...prevState,
					masticationUnilateral: false,
				}));
			}
			if (id === "masticationUnilateral") {
				setFormState((prevState) => ({
					...prevState,
					masticationBilateral: false,
				}));
				setFormState((prevState) => ({
					...prevState,
					masticationUnilateral: true,
				}));
			}
		}
		if (name === "deglutition") {
			if (id === "deglutitionAtypique") {
				setFormState((prevState) => ({
					...prevState,
					deglutitionAtypique: true,
				}));
				setFormState((prevState) => ({
					...prevState,
					deglutitionTypique: false,
				}));
			}
			if (id === "deglutitionTypique") {
				setFormState((prevState) => ({
					...prevState,
					deglutitionAtypique: false,
				}));
				setFormState((prevState) => ({
					...prevState,
					deglutitionTypique: true,
				}));
			}
		}

		const newValue = type === "radio" || type === "checkbox" ? checked : value;
		setFormState((prevState) => ({ ...prevState, [id]: newValue }));
	};

	const handlePreviousStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const handleNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const handleImageFileChange = (e) => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((oldArray) => [...oldArray, reader.result]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};
	const [allErrors, setAllErrors] = useState(null);
	const handleSubmit = (event) => {
		const formData = new FormData();
		for (let key in formState) {
			formData.append("postInfo." + key, formState[key]);
		}
		images.forEach((image) => {
			formData.append("images", image);
		});
		if (param.id) {
			dispatch(updatePost(post.post._id, formData));
		} else {
			dispatch(createPost(formData));
		}
	};
	useEffect(() => {
		if (currentStep === 5) {
			setAllErrors(validatePostInfo(formState));
			if (loading === false) {
				if (success) {
					navigate("/accueil");
				}
			}
		}
	}, [currentStep, loading, success, navigate, formState]);
	useEffect(() => {
		if (param.id && !post.success) {
			dispatch(getPost(param.id));
		}
		if (post.success) {
			const newPost = {
				postInfo: {
					...post.post.postInfo,
					dateOfBirth: dateFormat(post.post.postInfo.dateOfBirth),
				},
				images: post.post.images,
			};
			console.log(newPost);
			setFormState(newPost.postInfo);
			setImagesPreview(newPost.images);
			
		}
	}, [post.success]);

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<StepOne
						form={formState}
						handleChange={handleChange}
						onNextStep={handleNextStep}
					/>
				);
			case 2:
				return (
					<StepTwo
						form={formState}
						handleChange={handleChange}
						onPreviousStep={handlePreviousStep}
						onNextStep={handleNextStep}
					/>
				);
			case 3:
				return (
					<StepThree
						form={formState}
						handleChange={handleChange}
						onPreviousStep={handlePreviousStep}
						onNextStep={handleNextStep}
					/>
				);

			case 4:
				return (
					<StepFour
						form={formState}
						handleChange={handleChange}
						onPreviousStep={handlePreviousStep}
						onNextStep={handleNextStep}
					/>
				);
			case 5:
				return (
					<StepFive
						images={images}
						imagesPreview={imagesPreview}
						onImagechange={handleImageFileChange}
						onPreviousStep={handlePreviousStep}
						onSubmit={handleSubmit}
						allErrors={allErrors}
					/>
				);
			default:
				return null;
		}
	};

	const renderStepsProgress = () => {
		return (
			<div className="d-flex  justify-content-center">
				<span
					style={{ width: "4vh" }}
					className={`step-item rounded-circle shadow-lg  bg-${
						currentStep >= 1 ? "primary" : "secondary"
					} me-4`}
				>
					<span className="step-number justify-content-center d-flex  text-white">
						1
					</span>
				</span>
				<span
					style={{ width: "4vh" }}
					className={`step-item rounded-circle shadow-lg bg-${
						currentStep >= 2 ? "primary" : "secondary"
					} me-4`}
				>
					<span className="step-number justify-content-center d-flex text-white">
						2
					</span>
				</span>
				<span
					style={{ width: "4vh" }}
					className={`step-item rounded-circle shadow-lg bg-${
						currentStep >= 3 ? "primary" : "secondary"
					} me-4`}
				>
					<span className="step-number justify-content-center d-flex text-white">
						3
					</span>
				</span>
				<span
					style={{ width: "4vh" }}
					className={`step-item rounded-circle shadow-lg bg-${
						currentStep >= 4 ? "primary" : "secondary"
					} me-4`}
				>
					<span className="step-number justify-content-center d-flex text-white">
						4
					</span>
				</span>
				<span
					style={{ width: "4vh" }}
					className={`step-item rounded-circle shadow-lg bg-${
						currentStep >= 5 ? "primary" : "secondary"
					} me-4`}
				>
					<span className="step-number justify-content-center d-flex text-white">
						5
					</span>
				</span>
			</div>
		);
	};
	return (
		<>
		<MetaData title={`${param.id ? "update Post" : "Add Post"}`} />
			{renderStepsProgress()}
			{renderStep()}
		</>
	);
}

export default FormPost;
