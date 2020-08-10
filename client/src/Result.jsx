import React, { Component, Fragment } from "react";
import { Detail } from "./Detail";
import loading from "./loading.jpg";
import s from "./Result.module.css";

export class Result extends Component {
	constructor() {
		super();
		this.state = { result: {}, loaded: false, resultsDetail: null };
	}

	callAPI(request) {
		this.setState({ loaded: false });
		this.setState({ result: null });
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
		};
	};

	getUniqueIssues = (issues) => {
		const messages = issues.map((item) => item.message);
		return messages.filter((x, i, a) => a.indexOf(x) === i);
	};

	expandDetail = (issues, pageUrl, type, isUnique) => {
		this.setState({ resultsDetail: { issues, pageUrl, type, isUnique } });
	};

	closeDetail = () => {
		this.setState({ resultsDetail: null });
	};

	componentDidMount() {
		this.callAPI(this.props.query);
	}
	render() {
		if (!this.state.loaded)
			return (
				<tr className="table-info">
					<td colSpan="7">
						<img
							aria-label="Loading result"
							alt=""
							src={loading}
							className={s.loading}
						/>
					</td>
				</tr>
			);
		const { documentTitle, pageUrl, issues } = this.state.result;

		const { errors, warnings } = this.filterIssues(issues);

		return (
			<Fragment>
				<tr>
					<td>
						{this.props.query.url}
						<br />
						{this.props.query.url !== pageUrl && <small>Tested: {pageUrl}</small>}
					</td>
					<td>{this.props.query.rootElement}</td>
					<td>{documentTitle}</td>
					<td className="bg-danger">
						<button
							className="btn btn-danger"
							onClick={() => this.expandDetail(errors, pageUrl, "errors")}
						>
							<b>{errors.length}</b>
						</button>
					</td>
					<td className="bg-danger">
						<button
							className="btn btn-danger"
							onClick={() =>
								this.expandDetail(this.getUniqueIssues(errors), pageUrl, "errors", true)
							}
						>
							<b>{this.getUniqueIssues(errors).length}</b>
						</button>
					</td>
					<td className="bg-info">
						<button
							className="btn btn-info"
							onClick={() => this.expandDetail(warnings, pageUrl, "warnings")}
						>
							<b>{warnings.length}</b>
						</button>
					</td>
					<td className="bg-info">
						<button
							className="btn btn-info"
							onClick={() =>
								this.expandDetail(
									this.getUniqueIssues(warnings),
									pageUrl,
									"warnings",
									true
								)
							}
						>
							<b>{this.getUniqueIssues(warnings).length}</b>
						</button>
					</td>
				</tr>
				{this.state.resultsDetail && (
					<Detail close={this.closeDetail} {...this.state.resultsDetail} />
				)}
			</Fragment>
		);
	}
}
