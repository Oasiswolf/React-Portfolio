import React, { Component } from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			portfolioItem: {},
		};
	}

	UNSAFE_componentWillMount() {
		this.getPortfolioItem();
	}

	getPortfolioItem() {
		axios
			.get(
				`https://nathanlamb.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
				{ withCredentials: true }
			)
			.then((response) => {
				console.log("response from get call", response);
				this.setState({
					portfolioItem: response.data.portfolio_item,
				});
			})
			.catch((error) => {
				console.log("Error getting portfolio item", error);
			});
	}

	render() {
		const {
			banner_image_url,
			category,
			description,
			logo_url,
			name,
			thumb_image_url,
			url,
		} = this.state.portfolioItem;

		return (
			<div className="details-wrapper">
				<h2>Portfolio Detail for {this.props.match.params.slug}</h2>
				<div className="name-cat">
					<div className="name">
						<h1>{name}</h1>
					</div>
					<div className="cat">
						<h1>{category}</h1>
					</div>
				</div>
				<div className="description">
					<p>{description}</p>
				</div>
				<div className="url">
					<a href={url} target="_blank">
						Link
					</a>
				</div>

				<div className="image-wrapper">
					<div className="thumb-image">
						<img src={thumb_image_url} />
					</div>
					<div className="banner-image">
						<img src={banner_image_url} />
					</div>
					<div className="logo-image">
						<img src={logo_url} />
					</div>
				</div>
			</div>
		);
	}
}
