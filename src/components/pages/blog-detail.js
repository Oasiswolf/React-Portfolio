import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import BlogFeaturedImage from '../blog/blog-featured-image';

export default class BlogDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentId: this.props.match.params.slug,
			blogItem: {},
		};
		this.getBlogItems = this.getBlogItems.bind(this);
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
				console.log('Error getting blogItem', error);
			});
	}

	componentWillMount() {
		this.getBlogItems();
	}

	render() {
		const { title, content, featured_image_url, blog_status } =
			this.state.blogItem;
		return (
			<div className='blog-container'>
				<div className='content-container'>
					<h1>{title}</h1>

					<BlogFeaturedImage img={featured_image_url} />

					<div className='content'>
						{ReactHtmlParser(content)}
						<hr />
						{blog_status}
					</div>
				</div>
			</div>
		);
	}
}