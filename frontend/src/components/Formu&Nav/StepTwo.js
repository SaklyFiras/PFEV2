import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FormPost from "./FormPost";

function StepTwo({ form, handleChange, onPreviousStep, onNextStep }) {
	return (
		<Container className="step-two-container p-5 shadow-lg">
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					La respiration:
				</Form.Label>
				<Col sm={10}>
					<Form.Check
						type="radio"
						label="Nasal"
						name="respiration"
						id="respirationNasal"
						checked={form.respirationNasal}
						onChange={handleChange}
					/>
					<Form.Check
						type="radio"
						label="Buccal"
						name="respiration"
						id="respirationBuccal"
						checked={form.respirationBuccal}
						onChange={handleChange}
					/>
					<Form.Check
						type="radio"
						label="Mixte"
						name="respiration"
						id="respirationMixte"
						checked={form.respirationMixte}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					details:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						as="textarea"
						rows={1}
						id="detailsRespiration"
						value={form.detailsRespiration}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row} className="mb-3">
				<Form.Label column sm={10}>
					<Row> la Mastication:</Row>
				</Form.Label>
				<Col md={110}>
					<Form.Check
						type="radio"
						label="bilateral"
						id="masticationBilateral"
						name="mastication"
						checked={form.masticationBilateral}
						onChange={handleChange}
					/>
					<Form.Check
						type="radio"
						label="unilateral"
						id="masticationUnilateral"
						name="mastication"
						checked={form.masticationUnilateral}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					details:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						as="textarea"
						id="detailsMastication"
						rows={1}
						value={form.detailsMastication}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					la Deglutition:
				</Form.Label>
				<Col sm={10}>
					<Form.Check
						type="radio"
						label="Typique"
						id="deglutitionTypique"
						name="deglutition"
						checked={form.deglutitionTypique}
						onChange={handleChange}
					/>
					<Form.Check
						type="radio"
						label="Atypique"
						id="deglutitionAtypique"
						name="deglutition"
						checked={form.deglutitionAtypique}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					details:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						as="textarea"
						rows={1}
						id="detailsDeglutition"
						value={form.detailsDeglutition}
						onChange={handleChange}
						required
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Dermato:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						as="textarea"
						rows={1}
						id="dermato"
						value={form.dermato}
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

export default StepTwo;
