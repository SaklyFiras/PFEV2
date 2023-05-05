import Joi from "joi";
const postInfoSchema = Joi.object({
	title: Joi.string().required().min(1),
	bloodPressure: Joi.number().required(),
	dailyMedications: Joi.string().required().min(1),
	dateOfBirth: Joi.date().required(),
	deglutitionAtypique: Joi.boolean().required(),
	deglutitionTypique: Joi.boolean().required(),
	dentalHistory: Joi.string().required().min(1),
	dermato: Joi.string().required().min(1),
	description: Joi.string().required().min(1),
	detailsDeglutition: Joi.string().required().min(1),
	detailsMastication: Joi.string().required().min(1),
	detailsRespiration: Joi.string().required().min(1),
	examenAtmAutre: Joi.string().allow("").optional(),
	examenAtmAutreExplanation: Joi.string().allow("").optional(),
	examenAtmClaquement: Joi.string().required().min(1),
	examenAtmDouleur: Joi.boolean().required(),
	examenAtmNormal: Joi.string().required().min(1),
	examenExoBuccal: Joi.string().required().min(1),
	extraoralExamination: Joi.string().required().min(1),
	gender: Joi.string().valid("male", "female").required(),
	intraoralExamination: Joi.string().required().min(1),
	masticationBilateral: Joi.boolean().required(),
	masticationUnilateral: Joi.boolean().required(),
	medicalHistory: Joi.string().required().min(1),
	patientReference: Joi.string().required().min(1),
	pulse: Joi.number().required(),
	reasonConsultation: Joi.string().required().min(1),
	respiration: Joi.number().required(),
	respirationBuccal: Joi.boolean().required(),
	respirationMixte: Joi.boolean().required(),
	respirationNasal: Joi.boolean().required(),
	symetrie: Joi.boolean().required(),
	symetrieExplanation: Joi.string()
		.allow("")
		.when("symetrie", { is: true, then: Joi.required() }),
});

export function validatePostInfo(postInfo) {
	const { error } = postInfoSchema.validate(postInfo, { abortEarly: false });

	if (
		postInfo.respirationBuccal === false &&
		postInfo.respirationMixte === false &&
		postInfo.respirationNasal === false
	) {
		error.details.push({
			path: ["respiration"],
			message: "Please select one respiration option",
		});
	}
	if (
		postInfo.deglutitionAtypique === false &&
		postInfo.deglutitionTypique === false
	) {
		error.details.push({
			path: ["deglutition"],
			message: "Please select one deglutition option",
		});
	}
	if (
		postInfo.masticationBilateral === false &&
		postInfo.masticationUnilateral === false
	) {
		error.details.push({
			path: ["mastication"],
			message: "Please select one mastication option",
		});
	}
	if (postInfo.symetrie === false && postInfo.symetrieExplanation === "") {
		error.details.push({
			path: ["symetrieExplanation"],
			message: "Please enter a symetrie explanation",
		});
	}
	if (
		postInfo.examenAtmAutre !== "" &&
		postInfo.examenAtmAutreExplanation === ""
	) {
		error.details.push({
			path: ["examenAtmAutreExplanation"],
			message: "Please enter a examenAtmAutre explanation",
		});
	}

	if (!error) return null;
	console.log(error.details);
	const errors = {};
	for (let item of error.details) errors[item.path[0]] = item.message;

	return errors;
}

const postErrorHandler = () => {
	return <div>postErrorHandler</div>;
};

export default postErrorHandler;
