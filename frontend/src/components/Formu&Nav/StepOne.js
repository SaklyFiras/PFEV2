import React from "react";

import { Container, Col, Form, Button } from "react-bootstrap";

function StepOne({
	form,

	handleChange,
	onNextStep,
	onTitleChange,
}) {
	return (
		<Container  className="border p-5 shadow-lg step-one-container">
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Title:
				</Form.Label>
				<Col sm={10}>
					<Form.Control required  id="title" type="text" value={form.title} onChange={handleChange} />
				</Col>

				<Form.Group as={Col} className="mb-3">
					<Form.Label column sm={10}>
						Description:
					</Form.Label>
					<Col sm={10}>
						<Form.Control
						id="description"
							type="text"
							value={form.description}
							onChange={handleChange}
							required
						/>
					</Col>
				</Form.Group>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Patient Reference:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
					id="patientReference"
						type="text"
						value={form.patientReference}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Date of birth:
				</Form.Label>
				<Col sm={10}>
					<Form.Control required id="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Gender:
				</Form.Label>
				<Col sm={10}>
					<Form.Select id="gender" value={form.gender} onChange={handleChange}>
						<option value="">Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</Form.Select>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Reason for consultation:
				</Form.Label>
				<Col sm={10}>
					<Form.Control required id="reasonConsultation" type="text" value={form.reasonConsultation} onChange={handleChange} />
				</Col>
			</Form.Group>

			<Button variant="primary" onClick={onNextStep}>
				Next
			</Button>
		</Container>
	);
}

export default StepOne;
