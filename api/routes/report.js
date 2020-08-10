var express = require("express");
const pa11y = require("pa11y");
var router = express.Router();

router.post("/", async function (req, res) {
	if (!req.body) {
		res.statusMessage = "Send a URL";
		res.status(400).end();
	}

	await getPallyResult(req.body).then((data) => {
		res.send(data);
	});
});

async function getPallyResult({ url, rootElement }) {
	try {
		return await pa11y(url, {
			rootElement,
			includeWarnings: true,
		});
	} catch (error) {
		throw new Error(error);
	}
}

module.exports = router;
