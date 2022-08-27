const express = require("express");
const cors = require("cors");
const fs = require("fs");
const listings=require("./routes/listings");
const port = 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/listings',listings)

app.listen(port, () => {
  return console.log(`Listening on port ${port}`);
});
