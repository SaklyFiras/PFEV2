import React from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

function StepThree({ form, handleChange, onPreviousStep, onNextStep }) {
	return (
		<Container className="step-three-container p-5 shadow-lg">
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Medical History:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="medicalHistory"
						value={form.medicalHistory}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Daily Medications:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="dailyMedications"
						value={form.dailyMedications}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Blood Presure:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="number"
						id="bloodPressure"
						value={form.bloodPressure}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Pulse:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						id="pulse"
						type="number"
						value={form.pulse}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Respiration:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						id="respiration"
						type="number"
						value={form.respiration}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>

			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Dental History:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="dentalHistory"
						value={form.dentalHistory}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Extraoral Examination:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="extraoralExamination"
						value={form.extraoralExamination}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>

			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Intraoral Examination:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="intraoralExamination"
						value={form.intraoralExamination}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>

			<Row className="step-two-buttons">
				<Col xs={6} className="text-left">
					<Button variant="secondary" onClick={onPreviousStep}>
						Previous
					</Button>
				</Col>
				<Col xs={6} className="text-right">
					<Button variant="primary" onClick={onNextStep}>
						Next
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default StepThree;
