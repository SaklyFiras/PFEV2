import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				margin: "-25px 0 0 -25px",
			}}
		>
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="#1768AC"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClassName=""
				visible={true}
			/>
		</div>
	);
};

export default Loading;
