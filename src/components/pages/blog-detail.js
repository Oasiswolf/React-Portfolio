import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";
import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentId: this.props.match.params.slug,
			blogItem: {},
			editMode: false,
		};
		this.getBlogItems = this.getBlogItems.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleFeaturedImageDelete =
			this.handleFeaturedImageDelete.bind(this);
		this.formUpdateSubmit = this.formUpdateSubmit.bind(this);
	}

	formUpdateSubmit(blog) {
		this.setState({
			blogItem: blog,
			editMode: false,
		});
	}

	handleFeaturedImageDelete() {
		this.setState({
			blogItem: {
				featued_image_url: "",
			},
		});
	}

	handleEditClick() {
		if (this.props.loggedInStatus === "LOGGED_IN") {
			this.setState({ editMode: true });
		}
	}

	getBlogItems() {
		axios
			.get(
				`https://nathanlamb.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
			)
			.then((response) => {
				this.setState({
					blogItem: response.data.portfolio_blog,
				});
			})
			.catch((error) => {
				console.log("Error getting blogItem", error);
			});
	}

	UNSAFE_componentWillMount() {
		this.getBlogItems();
	}

	render() {
		const { title, content, featured_image_url, blog_status } =
			this.state.blogItem;

		const contentManager = () => {
			if (this.state.editMode) {
				return (
					<BlogForm
						formUpdateSubmit={this.formUpdateSubmit}
						edit={this.state.editMode}
						blogImageDelete={this.handleFeaturedImageDelete}
						blog={this.state.blogItem}
					/>
				);
			} else {
				return (
					<div className="content-container">
						<h1 onClick={this.handleEditClick}>{title}</h1>

						<BlogFeaturedImage img={featured_image_url} />

						<div className="content">
							{ReactHtmlParser(content)}
							<hr />
							{blog_status}
						</div>
					</div>
				);
			}
		};

		return <div className="blog-container">{contentManager()}</div>;
	}
}
