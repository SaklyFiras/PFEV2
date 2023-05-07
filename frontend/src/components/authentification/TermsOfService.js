import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const TermsOfService = () => {
	return (
		<Container>
			<Row className="mt-5">
				<Col>
					<h1>Terms of Service</h1>
					<p>
						By using our website, you agree to abide by our terms of service.
						You are responsible for the content that you post on our website.
						You must not post any content that is false, misleading, or
						defamatory, or that infringes on the rights of others.
					</p>
					<p>
						You must also respect the privacy of others. You may only share
						patient files and medical information with other users if you have
						obtained the patient's consent to do so.
					</p>
					<p>
						Our admin role is responsible for ensuring that our website remains
						respectful and professional. The admin has the authority to delete
						any posts or user accounts that violate our terms of service.
					</p>
					<p>
						We reserve the right to modify these terms of service at any time.
						By continuing to use our website, you agree to abide by the most
						current version of our terms of service.
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default TermsOfService;
