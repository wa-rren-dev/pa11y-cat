var express = require("express");
const pa11y = require("pa11y");
var router = express.Router();

router.post("/", async function (req, res, next) {
	const urls = req.body;
	const results = await urls.map(async (item) => {
		return await pa11y(item.url, {
			rootElement: (item && item.rootelement) || "html",
		});
	});
	res.send(results);
});

module.exports = router;
