import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const AboutUs = () => {
	return (
		<Container>
			<Row className="mt-5">
				<Col>
					<h1>Welcome to our social media website!</h1>
					<p>
						Our website is designed specifically for the dental field, and our
						goal is to facilitate communication and collaboration between
						dentists, professors, experts, and students in the dental field.
					</p>
					<p>
						We provide a platform where dental professionals can share patient
						files, medical information, and pictures with one another, allowing
						for discussion and collaboration on treatment plans and diagnoses.
					</p>
					<p>
						We believe that open communication and collaboration within the
						dental community can lead to improved patient outcomes and better
						overall dental health.
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutUs;
