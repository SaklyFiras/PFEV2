import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

const StepFour = ({ form, handleChange, onPreviousStep, onNextStep }) => {
	return (
		<Container className="container p-5 shadow-lg">
			<Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Examen ATM autre:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="examenAtmAutre"
						value={form.examenAtmAutre}
						onChange={handleChange}
					/>
				</Col>
        
			</Form.Group>
      <Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Examen ATM Autre Explenation:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="examenAtmAutreExplanation"
						value={form.examenAtmAutreExplanation}
						onChange={handleChange}
					/>
				</Col>
        
			</Form.Group>
      <Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Examen ATM claquement:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="examenAtmClaquement"
						value={form.examenAtmClaquement}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
      <Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Examen ATM Normal:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="examenAtmNormal"
						value={form.examenAtmNormal}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
      <Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Examen Exo Buccal:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="examenExoBuccal"
						value={form.examenExoBuccal}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
      <Form.Check
            inline
            label="Symetrie"
            type="checkbox"
            id="symetrie"
            value={form.symetrie}
            onChange={handleChange}
          />
          <Form.Group as={Col} className="mb-3">
				<Form.Label column sm={10}>
					Symetrie explenation:
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						type="text"
						id="symetrieExplanation"
						value={form.symetrieExplanation}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
      <Form.Check
            inline
            label="examen Atm Douleur"
            type="checkbox"
            id="examenAtmDouleur"
            value={form.examenAtmDouleur}
            onChange={handleChange}
          />

			

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
};

export default StepFour;
