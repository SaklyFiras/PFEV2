const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
	postInfo: {
		bloodPressure: {
			type: Number,
			required: [true, "Please enter blood pressure"],
		},
		dailyMedications: {
			type: String,
			required: [true, "Please enter daily medications"],
		},
		dateOfBirth: {
			type: Date,
			required: [true, "Please enter date of birth"],
		},
		deglutitionAtypique: {
			type: Boolean,
			required: [true, "Please enter deglutition atypique"],
		},
		deglutitionTypique: {
			type: Boolean,
			required: [true, "Please enter deglutition typique"],
		},
		dentalHistory: {
			type: String,
			required: [true, "Please enter dental history"],
		},
		dermato: {
			type: String,
			required: [true, "Please enter dermato"],
		},
		description: {
			type: String,
			required: [true, "Please enter description"],
		},
		detailsDeglutition: {
			type: String,
			required: [true, "Please enter details deglutition"],
		},
		detailsMastication: {
			type: String,
			required: [true, "Please enter details mastication"],
		},
		detailsRespiration: {
			type: String,
			required: [true, "Please enter details respiration"],
		},
		examenAtmAutre: {
			type: String,
			required: [true, "Please enter examen atm autre"],
		},
		examenAtmAutreExplanation: {
			type: String,
			required: [true, "Please enter examen atm autre explanation"],
		},
		examenAtmClaquement: {
			type: String,
			required: [true, "Please enter examen atm claquement"],
		},
		examenAtmDouleur: {
			type: Boolean,
			required: [true, "Please enter examen atm douleur"],
		},
		examenAtmNormal: {
			type: String,
			required: [true],
		},
		examenExoBuccal: {
			type: String,
			required: [true, "Please enter examen exo buccal"],
		},
		extraoralExamination: {
			type: String,
			required: [true, "Please enter extraoral examination"],
		},
		gender: {
			type: String,
			required: [true, "Please enter gender"],
			enum: {
				values: ["male", "female"],
				message: "gender is either male or female",
			},
		},
		intraoralExamination: {
			type: String,
			required: [true],
		},
		masticationBilateral: {
			type: Boolean,
			required: [true, "Please enter mastication bilateral"],
		},
		masticationUnilateral: {
			type: Boolean,
			required: [true, "Please enter mastication unilateral"],
		},
		medicalHistory: {
			type: String,
			required: [true],
		},
		patientReference: {
			type: String,
			required: [true],
		},
		pulse: {
			type: Number,
			required: [true, "Please enter pulse"],
		},
		reasonConsultation: {
			type: String,
			required: [true],
		},
		respiration: {
			type: Number,
			required: [true, "Please enter respiration"],
		},
		respirationBuccal: {
			type: Boolean,
			required: [true, "Please enter respiration buccal"],
		},
		respirationMixte: {
			type: Boolean,
			required: [true, "Please enter respiration mixte"],
		},
		respirationNasal: {
			type: Boolean,
			required: [true, "Please enter respiration nasal"],
		},
		symetrie: {
			type: Boolean,
			required: [true, "Please enter symetrie"],
		},
		symetrieExplanation: {
			type: String,
			
		},
		title: {
			type: String,
			required: [true, "Please enter title"],
		},
	},

	images: [
		{
			public_id: {
				type: String,
				// required: true
			},
			url: {
				type: String,
				// required: true
			},
		},
	],

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},

	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

module.exports = mongoose.model("Post", postSchema);
