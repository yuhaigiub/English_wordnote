const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);
app.use(bodyParser.json());

const wordsRoute = require("./routes/words.js");
app.use("/words", wordsRoute);

app.listen(3000, () => {
	console.log("Server listening on PORT 3000");
});
