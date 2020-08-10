import React, { Component } from "react";
import { Result } from "./Result";

class App extends Component {
	constructor() {
		super();
		this.state = {
			urlsToTest:
				"https://cks.nice.org.uk\nhttps://pathways.nice.org.uk\nhttps://www.nice.org.uk\nhttps://bnf.nice.org.uk",
			request: [],
			resultsDetail: null,
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
				<h1>pa11y-cat</h1>
				<p className="lead">
					Enter a set of URLs you'd like to run pa11y on, one per line.
				</p>

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
						className="btn btn-default pull-left"
						onClick={(e) => this.handleClick(this.state.urlsToTest)}
					>
						Run tests
					</button>
				</div>

				{this.state.request.length > 0 && (
					<div className="col-8">
						<table className="table table-bordered">
							<caption>List of results for the supplied URLs</caption>
							<thead>
								<tr>
									<th>URL</th>
									<th>Root</th>
									<th>Doc Title</th>
									<th>Total Errors</th>
									<th>Unique Errors</th>
									<th>Total Warnings</th>
									<th>Unique Warnings</th>
								</tr>
							</thead>
							<tbody>
								{this.state.request.map((request) => (
									<Result
										expandDetail={this.expandDetail}
										key={request.url}
										query={request}
									/>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
}

export default App;
