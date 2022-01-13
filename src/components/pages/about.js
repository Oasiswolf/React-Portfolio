import React from "react";
import familyPicture from "../../../static/assets/images/bio/myFamily.jpg";

export default function () {
	return (
		<div className="content-page-wrapper">
			<div
				className="left-column"
				style={{
					background: "url(" + familyPicture + ") no-repeat",
					backgroundSize: "contain",
					backgroundPosition: "center",
				}}
			/>
			<div className="right-column">
				<h1>About Page</h1>
			</div>
		</div>
	);
}
