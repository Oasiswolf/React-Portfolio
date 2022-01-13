import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			title: "",
			blog_status: "",
			content: "",
			featured_image: "",
			apiUrl: "https://nathanlamb.devcamp.space/portfolio/portfolio_blogs",
			apiAction: "post",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitModal = this.handleSubmitModal.bind(this);
		this.handleRichTextEdit = this.handleRichTextEdit.bind(this);
		this.deleteImage = this.deleteImage.bind(this);

		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

		this.featuredImageRef = React.createRef();
	}

	deleteImage(imageType) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.props.blogImageDelete();
			})
			.catch((error) => {
				console.log("DeleteImage Error", error);
			});
	}

	componentConfig() {
		return {
			iconFiletypes: [".jpg", ".png"],
			showFiletypeIcon: true,
			postUrl: "https://httpbin.org/post",
		};
	}

	djsConfig() {
		return {
			addRemoveLinks: true,
			maxFiles: 1,
		};
	}

	handleFeaturedImageDrop() {
		return {
			addedfile: (file) => this.setState({ featured_image: file }),
		};
	}

	handleRichTextEdit(content) {
		this.setState({ content });
	}

	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_blog[title]", this.state.title);
		formData.append("portfolio_blog[blog_status]", this.state.blog_status);
		formData.append("portfolio_blog[content]", this.state.content);

		if (this.state.featured_image) {
			formData.append(
				"portfolio_blog[featured_image]",
				this.state.featured_image
			);
		}

		return formData;
	}

	handleSubmitModal(event) {
		axios({
			method: this.state.apiAction,
			url: this.state.apiUrl,
			data: this.buildForm(),
			withCredentials: true,
		})
			.then((response) => {
				if (this.state.featured_image) {
					this.featuredImageRef.current.dropzone.removeAllFiles();
				}
				this.setState({
					title: "",
					blog_status: "",
					content: "",
					featured_image: "",
				});

				if (this.props.edit) {
					// update blog details
					this.props.formUpdateSubmit(response.data.portfolio_blog);
				} else {
					this.props.formSubmit(response.data.portfolio_blog);
				}
			})

			.catch((error) => {
				console.log("error submitting Modal", error);
			});
		event.preventDefault();
	}
	UNSAFE_componentWillMount() {
		if (this.props.edit) {
			this.setState({
				id: this.props.blog.id,
				title: this.props.blog.title,
				blog_status: this.props.blog.blog_status,
				content: this.props.blog.content,
				apiUrl: `https://nathanlamb.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
				apiAction: "patch",
			});
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	render() {
		return (
			<form
				onSubmit={this.handleSubmitModal}
				className="blog-form-wrapper"
			>
				<div className="two-column">
					<input
						className="blogTitle"
						type="text"
						onChange={this.handleChange}
						name="title"
						placeholder="Blog Title"
						value={this.state.title}
					/>

					<input
						className="status-selector"
						type="text"
						onChange={this.handleChange}
						name="blog_status"
						placeholder="Blog Status Published or Draft REQUIRED"
						value={this.state.blog_status}
					/>
				</div>
				<div className="one-column">
					<RichTextEditor
						handleEditorChange={this.handleRichTextEdit}
						editMode={this.props.edit}
						contentToEdit={
							this.props.edit && this.props.blog.content
								? this.props.blog.content
								: null
						}
					/>
				</div>

				<div className="imgUpLoader">
					{this.props.edit && this.props.blog.featured_image_url ? (
						<div className="form-image-wrapper">
							<img src={this.props.blog.featured_image_url} />
							<div className="img-delete-link">
								<FontAwesomeIcon
									icon={"file-upload"}
									onClick={() =>
										this.deleteImage("featured_image")
									}
								/>
							</div>
						</div>
					) : (
						<DropzoneComponent
							ref={this.featuredImageRef}
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleFeaturedImageDrop()}
						>
							<div className="dz-message">Featured Image</div>
						</DropzoneComponent>
					)}
				</div>
				<button className="modalbtn">Save</button>
			</form>
		);
	}
}
