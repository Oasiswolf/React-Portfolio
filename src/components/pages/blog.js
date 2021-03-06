import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
	constructor() {
		super();

		this.state = {
			blogItems: [],
			totalCount: 0,
			currentPage: 0,
			isLoading: true,
			blogModalIsOpen: false,
		};
		this.getBlogItems = this.getBlogItems.bind(this);
		this.onScroll = this.onScroll.bind(this);
		window.addEventListener("scroll", this.onScroll, false);
		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleNewBlogPost = this.handleNewBlogPost.bind(this);
		this.handleBlogDelete = this.handleBlogDelete.bind(this);
	}

	handleBlogDelete(blog) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
				{ withCredentials: true }
			)
			.then((response) => {
				console.log("Good Delete Response", response);
				this.setState({
					blogItems: this.state.blogItems.filter((blogItem) => {
						return blog.id !== blogItem.id;
					}),
				});
				return response.data;
			})
			.catch((error) => {
				console.log("Error Deleteing Blog Item", error);
			});
	}

	handleNewBlogPost(blog) {
		this.setState({
			blogModalIsOpen: false,
			blogItems: [blog].concat(this.state.blogItems),
		});
	}

	handleModalClose() {
		this.setState({
			blogModalIsOpen: false,
		});
	}

	handleModalOpen() {
		this.setState({
			blogModalIsOpen: true,
		});
	}

	onScroll() {
		if (
			this.state.isLoading ||
			this.state.blogItems.length === this.state.totalCount
		) {
			return;
		}

		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			console.log("get more posts loaded!");
			this.getBlogItems();
		}
	}

	getBlogItems() {
		this.setState({
			currentPage: this.state.currentPage + 1,
		});

		axios
			.get(
				`https://nathanlamb.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log("getting", response.data);
				this.setState({
					blogItems: this.state.blogItems.concat(
						response.data.portfolio_blogs
					),
					totalCount: response.data.meta.total_records,
					isLoading: false,
				});
			})
			.catch((error) => {
				console.log("Error getting blogs", error);
			});
	}

	UNSAFE_componentWillMount() {
		this.getBlogItems();
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll, false);
	}

	render() {
		const blogRecords = this.state.blogItems.map((blogItem) => {
			if (this.props.loggedInStatus === "LOGGED_IN") {
				return (
					<div className="admin-blog-wrapper" key={blogItem.id}>
						<BlogItem blogItem={blogItem} />
						<a onClick={() => this.handleBlogDelete(blogItem)}>
							<FontAwesomeIcon icon="trash" />
						</a>
					</div>
				);
			} else {
				return <BlogItem key={blogItem.id} blogItem={blogItem} />;
			}
		});

		return (
			<div className="blog-container">
				<BlogModal
					handleNewBlogPost={this.handleNewBlogPost}
					modalIsOpen={this.state.blogModalIsOpen}
					modalClose={this.handleModalClose}
				/>
				<h1>Blog</h1>
				<div className="modal-div">
					{this.props.loggedInStatus === "LOGGED_IN" ? (
						<a onClick={this.handleModalOpen}>
							<FontAwesomeIcon icon="plus-square" />
						</a>
					) : null}
				</div>

				<div className="content-container">{blogRecords}</div>
				{this.state.isLoading ? (
					<div className="content-loader">
						<FontAwesomeIcon
							icon="spinner"
							spin
							pulse
							className="load-icon"
						/>
					</div>
				) : null}
				<Link to="/about">Read about me!</Link>
			</div>
		);
	}
}

export default Blog;
