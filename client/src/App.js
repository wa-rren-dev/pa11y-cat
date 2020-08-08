import React, { Component, Fragment } from "react";

import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			results: [],
			urlsToTest: "https://www.nice.org.uk\nhttps://cks.nice.org.uk",
		};
	}

	callAPI(url) {
		fetch("http://localhost:9000/report", {
			method: "POST",
			body: JSON.stringify(url),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => this.setState({ results: res }))
			.catch((err) => err);
	}

	handleClick = () => {
		const urls = this.state.urlsToTest.split("\n");
		this.callAPI(urls);
	};

	handleChange = (e) => {
		this.setState({ urlsToTest: e.target.value });
	};

	render() {
		return (
			<div className="App">
				<textarea
					style={{ height: 300, width: 300 }}
					onChange={this.handleChange}
					value={this.state.urlsToTest}
				/>
				<hr />
				<button onClick={this.handleClick}>Test</button>
				<button onClick={() => this.setState({ urlsToTest: "" })}>Clear</button>
				{this.state.results.length > 0 && (
					<div>
						<p>
							<u>Results</u>
							<div>
								{this.state.results.map(({ documentTitle, pageUrl, issues }) => (
									<Fragment>
										<p>{documentTitle}</p>
										<p>{pageUrl}</p>
										<p>
											{issues.length > 0
												? `${issues.length} issues were found`
												: "No issues found"}
										</p>
									</Fragment>
								))}
							</div>
						</p>
					</div>
				)}
			</div>
		);
	}
}

export default App;
