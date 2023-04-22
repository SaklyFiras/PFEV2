import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { dateFormat } from "../user/userProfileDetails";

const MedicalInfoPost = ({ postInfo }) => {
	return (
		<Container className="my-3">
			<h2>{postInfo.title}</h2>
			<Row>
				<Col sm={6}>
					<h4>Personal Information</h4>
					<p>Gender: {postInfo.gender}</p>
					<p>Date of Birth: {dateFormat(postInfo.dateOfBirth)}</p>
					<p>Medical History: {postInfo.medicalHistory}</p>
					<p>Daily Medications: {postInfo.dailyMedications}</p>
					<p>Patient Reference : {postInfo.patientReference}</p>
				</Col>
				<Col sm={6}>
					<h4>Examination Information</h4>
					<p>Blood Pressure: {postInfo.bloodPressure}</p>
					<p>Pulse: {postInfo.pulse}</p>
					<p>Respiration: {postInfo.respiration}</p>
					<p>Intraoral Examination: {postInfo.intraoralExamination}</p>
					<p>Extraoral Examination: {postInfo.extraoralExamination}</p>
					
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<h4>Reason for Consultation</h4>
					<p>{postInfo.reasonConsultation}</p>
				</Col>
				<Col>
					<h4>Dental History</h4>
					<p>{postInfo.dentalHistory}</p>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<h4>Swallowing</h4>
					<p>
						Atypical Deglutition: {postInfo.deglutitionAtypique ? "Yes" : "No"}
					</p>
					<p>Typical Deglutition: {postInfo.deglutitionTypique}</p>
				</Col>
				<Col>
					<h4>Respiration</h4>
					<p>Buccal Respiration: {postInfo.respirationBuccal}</p>
					<p>Nasal Respiration: {postInfo.respirationNasal ? "Yes" : "No"}</p>
					<p>Mixed Respiration: {postInfo.respirationMixte}</p>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<h4>Mastication</h4>
					<p>
						Bilateral Mastication:{" "}
						{postInfo.masticationBilateral ? "Yes" : "No"}
					</p>
					<p>Unilateral Mastication: {postInfo.masticationUnilateral}</p>
				</Col>
				<Col>
					<h4>Symmetry</h4>
					<p>Symmetry: {postInfo.symetrie ? "Yes" : "No"}</p>
					<p>Symmetry Explanation: {postInfo.symetrieExplanation}</p>
				</Col>
			</Row>
            <hr/> 
			<Row>
				<Col>
					<h4>Temporomandibular Joint (TMJ) Examination</h4>
					<p>Normal: {postInfo.examenAtmNormal}</p>
					<p>Claquement: {postInfo.examenAtmClaquement}</p>
					<p>Pain: {postInfo.examenAtmDouleur ? "Yes" : "No"}</p>
					<p>Other: {postInfo.examenAtmAutre}</p>
					<p>Other Explanation: {postInfo.examenAtmAutreExplanation}</p>
				</Col>
				<Col>
					<h4>Additional Details</h4>
					<p>Details of Deglutition: {postInfo.detailsDeglutition}</p>
					<p>Details of Mastication: {postInfo.detailsMastication}</p>
					<p>Details of Respiration: {postInfo.detailsRespiration}</p>
					<p>Dermato: {postInfo.dermato}</p>
				</Col>
			</Row>
		</Container>
	);
};

export default MedicalInfoPost;
