const express = require("express");
const cors = require("cors");
const fs = require("fs");
const port = 8080;

const app = express();
app.use(cors());
app.use(express.json());

// Reusable function to read data from data files
const readData = (path) => {
  const dataFile = fs.readFileSync(path);
  const parsedData = JSON.parse(dataFile);
  return parsedData;
};

app.get("/listings", (req, res) => {
  const listingsData = readData("./data/listings.json");
  res.status(200).json(listingsData);
});

app.listen(port, () => {
  return console.log(`Listening on port ${port}`);
});
