import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contactPicture from "../../../static/assets/images/bio/contactPicture.jpg";

export default function () {
	return (
		<div className="content-page-wrapper">
			<div
				className="left-column"
				style={{
					background: "url(" + contactPicture + ") no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<div className="right-column">
				<h1>Contact Information</h1>
				<div className="contact-wrapper">
					<div className="icon">
						<FontAwesomeIcon icon="phone-square" />
					</div>
					<div className="text">555-555-5555</div>
					<div className="icon">
						<FontAwesomeIcon icon="envelope-square" />
					</div>
					<div className="text">usmc_wolf@hotmail.com</div>
					<div className="icon">
						<FontAwesomeIcon icon="map-marker-alt" />
					</div>
					<div className="text">Amarillo, Texas</div>
				</div>
			</div>
		</div>
	);
}
