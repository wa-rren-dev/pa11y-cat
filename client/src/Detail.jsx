import React from "react";
import s from "./detail.module.css";

const getStyle = (type) => {
	if (type === "errors") return "bg-danger";
	if (type === "warnings") return "bg-info";
	return "bg-success";
};

export function Detail({ issues, pageUrl, type, close }) {
	return (
		<tr className={getStyle(type)}>
			<td colSpan="6">
				<div className={s.details}>
					{issues.map((issue) => (
						<table>
							<tr>
								<td>{issue.message}</td>
							</tr>
						</table>
					))}
				</div>
			</td>
		</tr>
	);
}
