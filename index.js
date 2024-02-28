const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const translate = require("translate-google");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());

app.post("/translate", async (req, res) => {
  if (!req.body || !req.body.msg || !req.body.to) {
    return res
      .status(400)
      .json({ error: "Missing request body or parameters" });
  }
  const { msg, to } = req.body;

  try {
    const translation = await translate(msg, { from: "auto", to: to });
    res.status(200).json({ translation });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
