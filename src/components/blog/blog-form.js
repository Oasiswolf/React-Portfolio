import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";

// import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
// import '../../../node_modules/dropzone/dist/min/dropzone.min.css';

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			blog_status: "",
			content: "",
			featured_image: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitModal = this.handleSubmitModal.bind(this);
		this.handleRichTextEdit = this.handleRichTextEdit.bind(this);

		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

		this.featuredImageRef = React.createRef();
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
		axios
			.post(
				"https://nathanlamb.devcamp.space/portfolio/portfolio_blogs",
				this.buildForm(),
				{ withCredentials: true }
			)

			.then((response) => {
				if (this.state.featured_image) {
					this.featuredImageRef.current.dropzone.removeAllFiles();
				}
				this.setState({
					id: "",
					title: "",
					blog_status: "",
					content: "",
					featured_image: "",
				});

				this.props.formSubmit(response.data.portfolio_blog);
			})

			.catch((error) => {
				console.log("error submitting Modal", error);
			});
		event.preventDefault();
	}
	UNSAFE_componentWillMount() {
		if (this.props.edit) {
			this.setState({
				id: this.props.editBlog.id,
				title: this.props.editBlog.title,
				status: this.props.editBlog.status,
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
							this.props.edit && this.props.editBlog.content
								? this.props.editBlog.content
								: null
						}
					/>
				</div>

				<div className="imgUpLoader">
					<DropzoneComponent
						ref={this.featuredImageRef}
						config={this.componentConfig()}
						djsConfig={this.djsConfig()}
						eventHandlers={this.handleFeaturedImageDrop()}
					>
						<div className="dz-message">Featured Image</div>
					</DropzoneComponent>
				</div>
				<button className="modalbtn">Save</button>
			</form>
		);
	}
}
