import React, { Component } from "react";
import axios from "axios";
// yea
import PortfolioItem from "./portfolioItem";

export default class PortfolioContainer extends Component {
	constructor() {
		super();
		this.state = {
			pageTitle: "Welcome to my Portfolio",
			isLoading: false,
			data: [],
		};
		console.log("Portfolio container has Rendered!");

		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilter(filter) {
		if (filter === "RESET") {
			this.getPortfolioItems();
		} else {
			this.getPortfolioItems(filter);
		}
	}

	portfolioItems() {
		return this.state.data.map((item) => {
			return <PortfolioItem key={item.id} item={item} />;
		});
	}

	getPortfolioItems(filter = null) {
		axios
			.get("https://nathanlamb.devcamp.space/portfolio/portfolio_items")
			.then((response) => {
				// handle success
				if (filter) {
					console.log("Loaded Items with filter", response);
					this.setState({
						data: response.data.portfolio_items.filter((item) => {
							return item.category === filter;
						}),
					});
				} else {
					console.log("Loaded Items No Filters", response);
					this.setState({
						data: response.data.portfolio_items,
					});
				}
			})
			.catch((error) => {
				// handle error
				console.log("Error Loading Portfolio Items", error);
			});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	// handlePageTitleUpdate() {
	//     this.setState({
	//         pageTitle: "This is an AWESOME Portfolio"
	//     })
	// }

	render() {
		if (this.state.isLoading) {
			return <div>Loading....</div>;
		}

		return (
			<div className="homepage-wrapper">
				<div className="filter-links">
					<button
						className="btn"
						onClick={() => this.handleFilter("Network Setup")}
					>
						Networking
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter("Game")}
					>
						Games
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter("tbd")}
					>
						Future Endeavors
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter("RESET")}
					>
						Show All
					</button>
				</div>
				<div className="portfolio-items-wrapper">
					{this.portfolioItems()}
				</div>
			</div>
		);
	}
}
