import React, { useState } from "react";

const ChangePhoto = ({ onChange, name, user, setImage }) => {
	const [imgPreview, setImagePreview] = useState();

	const handleFileChange = (event) => {
		const files = event.target.files;
		if (files.length !== 1) {
			alert("Please select exactly one image file.");
			return;
		}
		const file = files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result);
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	return (
		<div>
			<input
				type="file"
				name={name}
				accept="image/*"
				onChange={handleFileChange}
			/>

			<img
				src={imgPreview}
				key={imgPreview}
				alt="avatar Preview"
				width="55"
				height="52"
			/>
		</div>
	);
};

export default ChangePhoto;
