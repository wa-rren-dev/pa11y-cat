import React from "react";
import s from "./Detail.module.css";

const getStyle = (type) => {
	if (type === "errors") return "bg-danger";
	if (type === "warnings") return "bg-info";
	return "bg-success";
};

export function Detail({ issues, pageUrl, type, close, isUnique }) {
	return (
		<tr className={getStyle(type)}>
			<td colSpan="7">
				<div className={s.details}>
					{isUnique ? (
						<>
							<button className="btn btn-default pull-right" onClick={close}>
								Close
							</button>
							<ul>
								{issues.map((issue) => (
									<li>{issue}</li>
								))}
							</ul>
						</>
					) : (
						<table className={["table", "table-striped", s.detail].join(" ")}>
							<caption className={s.caption}>
								Accessibility {type} for {pageUrl}.{" "}
								<button className="btn btn-default pull-right" onClick={close}>
									Close
								</button>
							</caption>
							<thead>
								<tr>
									<th className={s.tableHead}>Message</th>
									<th className={s.tableHead}>Context</th>
									<th className={s.tableHead}>Selector</th>
								</tr>
							</thead>
							<tbody>
								{issues.map((issue, idx) => (
									<tr key={idx}>
										<td>{issue.message}</td>
										<td>
											<code>{issue.context}</code>
										</td>
										<td>
											<pre className={s.preTag}>{issue.selector}</pre>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</td>
		</tr>
	);
}
