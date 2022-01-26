import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebar from "../portfolio/portfolio-sidebar";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
	constructor() {
		super();
		this.state = {
			portfolioItems: [],
			portfolioToEdit: {},
		};
		this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
		this.handleNewFormSubmit = this.handleNewFormSubmit.bind(this);
		this.handleFormSubmitError = this.handleFormSubmitError.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.clearPortfolioEdit = this.clearPortfolioEdit.bind(this);
	}

	clearPortfolioEdit() {
		this.setState({
			portfolioToEdit: {},
		});
	}

	handleUpdate(portfolioItem) {
		this.setState({
			portfolioToEdit: portfolioItem,
		});
	}

	handleDeleteClick(portfolioItem) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					portfolioItems: this.state.portfolioItems.filter((item) => {
						return item.id !== portfolioItem.id;
					}),
				});
				return response.data;
			})
			.catch((error) => {
				console.log("handleDeleteClick Error", error);
			});
	}

	handleEditFormSubmit() {
		this.getPortfolioItems();
	}

	handleNewFormSubmit(portfolioItem) {
		this.setState({
			portfolioItems: [portfolioItem].concat(this.state.portfolioItems),
		});
	}

	handleFormSubmitError(error) {
		console.log("handleFormSubmitError", error);
	}

	getPortfolioItems() {
		axios
			.get(
				"https://nathanlamb.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					portfolioItems: [...response.data.portfolio_items],
				});
			})
			.catch((error) => {
				console.log("error on get portfolioItems", error);
			});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		return (
			<div className="portfolio-manager-wrapper">
				<div className="left-column">
					<PortfolioForm
						portfolioToEdit={this.state.portfolioToEdit}
						clearPortfolioEdit={this.clearPortfolioEdit}
						handleNewFormSubmit={this.handleNewFormSubmit}
						handleEditFormSubmit={this.handleEditFormSubmit}
						handleFormSubmitError={this.handleFormSubmitError}
					/>
				</div>
				<div className="right-column">
					<PortfolioSidebar
						update={this.handleUpdate}
						delete={this.handleDeleteClick}
						data={this.state.portfolioItems}
					/>
				</div>
			</div>
		);
	}
}
