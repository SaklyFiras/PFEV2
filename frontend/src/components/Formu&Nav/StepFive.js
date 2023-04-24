import React from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import Loading from "../routes/loading";

const StepFive = ({
	images,
	imagesPreview,
	onImagechange,
	onPreviousStep,
	onSubmit,
	allErrors,
	submitBtn
}) => {
	return (
		<Container className="container border p-5 shadow-lg">
			<Form.Group as={Row} className="mb-3">
				<Form.Label column sm={2}>
					Images
				</Form.Label>
				<Col sm={10}>
					<input
						type="file"
						name="imageFile"
						multiple
						onChange={onImagechange}
						value=""
					/>

					<div className="imagePreview">
						{imagesPreview.map((img) => (
							<img
								src={img}
								key={img}
								alt="Images Preview"
								width="55"
								height="52"
							/>
						))}
					</div>
				</Col>
			</Form.Group>
			<Row className="step-three-buttons ">
				<Col xs={6} className="text-left">
					<Button variant="secondary" onClick={onPreviousStep}>
						Previous
					</Button>
				</Col>
				<Col xs={6} className="text-right">
					<Button
						variant="primary"
						type="submit"
						onClick={onSubmit}
						disabled={submitBtn}
					>
						Submit
					</Button>
				</Col>
			</Row>
			{allErrors && (
				<>
					{Object.keys(allErrors).map((error) => (
						<Row className="justify-content-md-center m-0 p-0">
							<Col xs lg="12">
								<div className="alert alert-danger" role="alert">
									{allErrors[error]}
								</div>
							</Col>
						</Row>
					))}
				</>
			)}
		</Container>
	);
};

export default StepFive;
