import React, { Component, Fragment } from "react";
import { Result } from "./Result";

class App extends Component {
	constructor() {
		super();
		this.state = {
			urlsToTest:
				"https://www.nice.org.uk\nhttps://cks.nice.org.uk\nhttps://pathways.nice.org.uk",
			request: [],
		};
	}

	handleClick = (urls) => {
		this.setState({ request: [] }, () => {
			let formatted = [];
			const splitUrls = urls.split("\n");
			splitUrls.forEach((url) => {
				formatted.push({ url: url, rootElement: "html" });
			});
			this.setState({ request: formatted });
		});
	};

	handleChange = (e) => {
		this.setState({ urlsToTest: e.target.value });
	};

	render() {
		return (
			<div className="container-fluid">
				<div className="form-group">
					<label htmlFor="urls">URLs to test</label>
					<textarea
						rows="10"
						className="form-control"
						id="urls"
						onChange={this.handleChange}
						value={this.state.urlsToTest}
					/>
				</div>
				<div className="clearfix">
					<button
						className="btn btn-success pull-left"
						onClick={(e) => this.handleClick(this.state.urlsToTest)}
					>
						Run tests
					</button>
				</div>

				{this.state.request.length > 0 && (
					<Fragment>
						<h2>Results</h2>
						<table className="table table-bordered table-striped">
							<thead>
								<tr>
									<th>URL</th>
									<th>Root</th>
									<th>Doc Title</th>
									<th>Tested URL</th>
									<th>Errors</th>
									<th>Warnings</th>
									<th>Notices</th>
								</tr>
							</thead>
							<tbody>
								{this.state.request.map((request) => (
									<Result key={request.url} query={request} />
								))}
							</tbody>
						</table>
					</Fragment>
				)}
			</div>
		);
	}
}

export default App;
