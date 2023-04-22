import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalBtn({ component, clickHandler,styleBtn }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant={styleBtn} onClick={handleShow}>
				{component}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>alert</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are You Sure ? this cannot be undone</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={clickHandler}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalBtn;
