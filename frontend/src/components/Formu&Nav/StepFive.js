import React from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { isValidUrl } from "../user/userProfile";
import { useSelector } from "react-redux";

const StepFive = ({
	imagesPreview,
	onImagechange,
	onPreviousStep,
	onSubmit,
	allErrors,
}) => {
	const { loading } = useSelector((state) => state.post);
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
								src={isValidUrl(img.url) ? img.url : img}
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
						disabled={allErrors}
					>
						{loading ? (
							<div class="spinner-border" role="status"></div>
						) : (
							"Submit"
						)}
					</Button>
				</Col>
			</Row>
			{allErrors && (
				<>
					{Object.keys(allErrors).map((error) => (
						<p
							key={error}
							className="font-monospace lh-1 fw-bold text-danger text-decoration-underline"
						>
							{allErrors[error]}!
						</p>
					))}
				</>
			)}
		</Container>
	);
};

export default StepFive;
