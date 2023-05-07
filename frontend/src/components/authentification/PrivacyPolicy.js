import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const PrivacyPolicy = () => {
	return (
        <Container>
        <Row className="mt-5">
          <Col>
            <h1>Privacy Policy</h1>
            <p>We take the privacy of our users very seriously. We collect personal information such as your name, email address, and professional credentials when you sign up for our website. We use this information to create and manage your account, and to facilitate communication between users.</p>
            <p>We also collect information about your use of our website, including the patient files and medical information that you upload and share with others. This information is used to improve our website and services, and to ensure that our website remains secure and functional.</p>
            <p>We do not share your personal information with third parties without your consent, except in cases where we are required to do so by law.</p>
          </Col>
        </Row>
      </Container>
	);
};

export default PrivacyPolicy;
