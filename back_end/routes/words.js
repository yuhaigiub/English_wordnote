const express = require("express");
const nano = require("nano");

const router = express.Router();
const server = nano("http://admin:admin@localhost:5984");
const db = server.db.use("english_words");

router
	.route("/")
	.get(async (req, res) => {
		const docList = await db.list({ include_docs: true });
		res.json(docList);
	})
	.post(async (req, res) => {
		const response = await db.insert(req.body);
		res.send(response);
	});

router.get("/:id", async (req, res) => {
	const doc = await db.get(req.params.id);
	res.json(doc);
});

router.put("/:id-:rev", async (req, res) => {
	const response = await db.insert({ _id: req.params.id, _rev: req.params.rev, ...req.body });
	res.send(response);
});

router.delete("/:id-:rev", async (req, res) => {
	const response = await db.destroy(req.params.id, req.params.rev);
	res.send(response);
});

module.exports = router;
