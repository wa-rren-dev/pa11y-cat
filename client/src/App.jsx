import React, { Component } from "react";
import { Result } from "./Result";

class App extends Component {
	constructor() {
		super();
		this.state = {
			rootElement: "html",
			urlsToTest:
				"https://cks.nice.org.uk\nhttps://pathways.nice.org.uk\nhttps://www.nice.org.uk\nhttps://bnf.nice.org.uk",
			request: [],
			resultsDetail: null,
		};
	}

	handleClick = (urls, rootElement) => {
		this.setState({ request: [] }, () => {
			let formatted = [];
			const splitUrls = urls.split("\n");
			splitUrls.forEach((url) => {
				formatted.push({ url: url, rootElement });
			});
			this.setState({ request: formatted });
		});
	};

	handleUrlChange = (e) => {
		this.setState({ urlsToTest: e.target.value });
	};

	handleRootElementChange = (e) => {
		this.setState({ rootElement: e.target.value });
	};

	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1>Pa11y Cat</h1>
					<p>Enter a set of URLs you'd like to run pa11y on, one per line.</p>
					<p>
						<a href="https://pa11y.org/" target="_blank" rel="noreferrer noopener">
							What is pally?
						</a>
					</p>
				</div>

				<div className="row">
					<div className="col-xs-6">
						<div className="form-group">
							<label htmlFor="urls">URLs to test</label>
							<textarea
								rows="10"
								className="form-control"
								id="urls"
								onChange={this.handleUrlChange}
								value={this.state.urlsToTest}
							/>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="form-group">
							<label htmlFor="rootElement">Root element</label>
							<input
								className="form-control"
								type="text"
								id="rootElement"
								name="rootElement"
								defaultValue={this.state.rootElement}
								onChange={this.handleRootElementChange}
							/>
							<span id="helpBlock" className="help-block">
								Use syntax that will be compatible with{" "}
								<code>document.querySelector</code>. The same selector will be used on
								each of the supplied pages. As per <code>document.querySelector</code>,
								only the first of a set of matching elements will be assessed.
							</span>
						</div>
					</div>
				</div>
				<div className="clearfix">
					<button
						className="btn btn-success pull-left"
						onClick={(e) =>
							this.handleClick(this.state.urlsToTest, this.state.rootElement)
						}
					>
						Run tests
					</button>
				</div>
				{this.state.request.length > 0 && (
					<div>
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
