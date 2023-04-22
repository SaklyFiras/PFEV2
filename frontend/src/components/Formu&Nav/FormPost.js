import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import { createPost } from "../../redux/reducers/postReducer";

// const Testing = {

// 		bloodPressure: 130,
// 		dailyMedications: "Metformin",
// 		dateOfBirth: "1972-11-05",
// 		deglutitionAtypique: false,
// 		deglutitionTypique: "No issues with swallowing",
// 		dentalHistory: "Several missing teeth, requires partial dentures",
// 		dermato: "Dry skin, prone to psoriasis",
// 		description: "Experiencing pain and bleeding in gums",
// 		detailsDeglutition: "None",
// 		detailsMastication: "Difficulty chewing with missing teeth",
// 		detailsRespiration: "None",
// 		examenAtmAutre: "None",
// 		examenAtmAutreExplanation: "None",
// 		examenAtmClaquement: "No",
// 		examenAtmDouleur: false,
// 		examenAtmNormal: "No abnormalities observed",
// 		examenExoBuccal: "Swollen and tender gums",
// 		extraoralExamination: "No major abnormalities observed",
// 		gender: "female",
// 		intraoralExamination: "Several missing teeth, several fillings",
// 		masticationBilateral: false,
// 		masticationUnilateral: "Noone",
// 		medicalHistory:
// 			"Type 2 diabetes, currently controlled with medication and diet",
// 		patientReference: "Susan Johnson",
// 		pulse: 85,
// 		reasonConsultation: "Gum pain and bleeding",
// 		respiration: 20,
// 		respirationBuccal: "No",
// 		respirationMixte: "No",
// 		respirationNasal: true,
// 		symetrie: true,
// 		symetrieExplanation: "No major asymmetry observed",
// 		title: "Gum Pain and Bleeding",

// };

function FormPost() {
	const dispatch = useDispatch();
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
		masticationUnilateral: "",
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

	const handleSubmit = (event) => {
		const formData = new FormData();
		for (let key in formState) {
			formData.append("postInfo." + key, formState[key]);
		}
		images.forEach((image) => {
			formData.append("images", image);
		});

		dispatch(createPost(formData));
	};

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
			{renderStepsProgress()}
			{renderStep()}
		</>
	);
}

export default FormPost;
