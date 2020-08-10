import React, { Component, Fragment } from "react";

export class Result extends Component {
	constructor() {
		super();
		this.state = { result: {}, loaded: false };
	}

	callAPI(request) {
		fetch("http://localhost:9000/report", {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => this.setState({ result: res, loaded: true }))
			.catch((err) => err);
	}

	filterIssues = (issues) => {
		return {
			errors: issues.filter((issue) => issue.type === "error"),
			warnings: issues.filter((issue) => issue.type === "warning"),
			notices: issues.filter((issue) => issue.type === "notice"),
		};
	};

	componentDidMount() {
		this.callAPI(this.props.query);
	}
	render() {
		if (!this.state.loaded)
			return (
				<tr className="table-info">
					<td colSpan="7">Loading...</td>
				</tr>
			);
		const { documentTitle, pageUrl, issues } = this.state.result;

		const { errors, warnings, notices } = this.filterIssues(issues);

		return (
			<Fragment>
				<tr>
					<td>{this.props.query.url}</td>
					<td>{this.props.query.rootElement}</td>
					<td>{documentTitle}</td>
					<td>{pageUrl}</td>
					<td className="bg-danger">
						<b>{errors.length}</b>
					</td>
					<td className="bg-info">{warnings.length}</td>
					<td>{notices.length}</td>
				</tr>
			</Fragment>
		);
	}
}
