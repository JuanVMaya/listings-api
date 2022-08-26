const express = require("express");
const cors = require("cors");
const port=8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/listings", (req, res) => {
  res.status(200).send("Hello from GET");
});

app.listen(port, () => {
  return console.log(`Listening on port ${port}`);
});
