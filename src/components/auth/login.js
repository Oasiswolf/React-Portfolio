import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errorText: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			errorText: "",
		});
	}

	handleSubmit(event) {
		axios
			.post(
				"https://api.devcamp.space/sessions",
				{
					client: {
						email: this.state.email,
						password: this.state.password,
					},
				},
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data.status === "created") {
					console.log("You can come in ...");
					this.props.handleSuccessfulAuth();
				} else {
					this.setState({
						errorText: "Wrong Email or Password try again!",
					});
					this.props.handleUnSuccessfulAuth();
				}
			})
			.catch((error) => {
				this.setState({ errorText: "An error occured" });
			});
		console.log(this.state.errorText);
		event.preventDefault();
	}

	render() {
		return (
			<div className="signin-wrapper">
				<h1>LOGIN TO YOUR DASHBOARD</h1>
				<div>{this.state.errorText}</div>
				<form
					onSubmit={this.handleSubmit}
					className="auth-form-wrapper"
				>
					<div className="email-wrapper">
						<FontAwesomeIcon icon="envelope-square" />
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>

					<div className="password-wrapper">
						<FontAwesomeIcon icon="lock" />
						<input
							type="password"
							name="password"
							placeholder="Your password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>

					<div className="btnDiv">
						<button className="subBtn" type="submit">
							Login
						</button>
					</div>
				</form>
			</div>
		);
	}
}
