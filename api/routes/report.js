const express = require("express");
const pa11y = require("pa11y");
const axios = require("axios");
const cheerio = require("cheerio");

var router = express.Router();

router.post("/", async function (req, res) {
	if (!req.body) {
		res.statusMessage = "Send a URL";
		res.status(400).end();
	}

	await getPallyResult(req.body).then((data) => {
		res.send({
			status: "success",
			data, // this can contain the error data
		});
	});
});

async function checkForRootElement(url, rootElement) {
	try {
		const { data } = await axios(url);
		const $ = cheerio.load(data);
		return $(rootElement).length || 0;
	} catch (e) {
		return {
			status: "error",
			message: `Encountered an error looking for the root element "${rootElement}"`,
			rootElement,
		};
	}
}

async function getPallyResult({ url, rootElement }) {
	const matchingElements = await checkForRootElement(url, rootElement);
	if (!matchingElements)
		return {
			status: "error",
			message: `Selector ${rootElement} is not present in the page!`,
			rootElement,
		};
	try {
		return await pa11y(url, {
			chromeLaunchConfig: {
				args: ["--no-sandbox"],
			},
			rootElement,
			includeWarnings: true,
		});
	} catch (error) {
		return {
			status: "error",
			message: error.message,
			rootElement,
		};
	}
}

module.exports = router;
