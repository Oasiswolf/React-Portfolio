import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';

import RichTextEditor from '../forms/rich-text-editor';

export default class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			blog_status: '',
			content: '',
			featured_image: '',
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
			iconFileTypes: ['.jpg', '.png'],
			showFileTypeIcon: true,
			postUrl: 'https://httpbin.org/post',
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
			addedFile: (file) => this.setState({ featured_image: file }),
		};
	}

	handleRichTextEdit(content) {
		this.setState({ content });
	}

	buildForm() {
		let formData = new FormData();

		formData.append('portfolio_blog[title]', this.state.title);
		formData.append('portfolio_blog[blog_status]', this.state.blog_status);
		formData.append('portfolio_blog[content]', this.state.content);

		if (this.state.featured_image) {
			formData.append(
				'portfolio_blog[featured_image]',
				this.state.featured_image
			);
		}

		return formData;
	}

	handleSubmitModal(event) {
		axios
			.post(
				'https://nathanlamb.devcamp.space/portfolio/portfolio_blogs',
				this.buildForm(),
				{ withCredentials: true }
			)

			.then((response) => {
				if (this.state.featured_image) {
					this.featuredImageRef.current.dropzone.removeAllFiles();
				}
				this.setState({
					title: '',
					blog_status: '',
					content: '',
					featured_image: '',
				});

				this.props.formSubmit(response.data.portfolio_blog);
			})

			.catch((error) => {
				console.log('error submitting Modal', error);
			});
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	render() {
		return (
			<form onSubmit={this.handleSubmitModal} className='blog-form-wrapper'>
				<div className='two-column'>
					<input
						type='text'
						onChange={this.handleChange}
						name='title'
						placeholder='Blog Title'
						value={this.state.title}
					/>

					<input
						type='text'
						onChange={this.handleChange}
						name='blog_status'
						placeholder='Blog Status'
						value={this.state.blog_status}
					/>
				</div>
				<div className='one-column'>
					<RichTextEditor handleEditorChange={this.handleRichTextEdit} />
				</div>

				<div className='imguploader'>
					<DropzoneComponent
						ref={this.featuredImageRef}
						config={this.componentConfig()}
						djsConfig={this.djsConfig()}
						eventHandlers={this.handleFeaturedImageDrop()}
					>
						<div className='dz-message'>Featured Image</div>
					</DropzoneComponent>
				</div>

				<button className='btn'>Save</button>
			</form>
		);
	}
}
