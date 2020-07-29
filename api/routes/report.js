var express = require("express");
const pa11y = require("pa11y");
var router = express.Router();

router.post("/", async function (req, res) {
	getData(req.body).then((data) => {
		res.send(data);
	});
});

module.exports = router;

async function getPallyResult({ url, rootElement = "html" }) {
	try {
		return await pa11y(url, {
			rootElement,
		});
	} catch (error) {
		throw new Error(error);
	}
}

async function getData(urls) {
	return Promise.all(urls.map((item) => getPallyResult(item)));
}
