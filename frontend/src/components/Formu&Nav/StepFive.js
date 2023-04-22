import React from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import Loading from "../routes/loading";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const StepFive = ({
	images,
	imagesPreview,
	onImagechange,
	onPreviousStep,
	onSubmit,
}) => {
	const { loading, success, error } = useSelector((state) => state.post);
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
						onClick={() => onSubmit(images)}
					>
						Submit
					</Button>
				</Col>
			</Row>
			{loading ? (
				<Loading />
			) : success ? (<>
				<h1>Success</h1>
				<Navigate to="/accueil" />
				</>
			) : (
				error && <h1>{error}</h1>
			)}
		</Container>
	);
};

export default StepFive;
