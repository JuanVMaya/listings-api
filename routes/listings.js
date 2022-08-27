const router = require("express").Router();
const uniqid = require("uniqid");
const fs = require("fs");

// Reusable function to read data from data files
const readData = (path) => {
  const dataFile = fs.readFileSync(path);
  const parsedData = JSON.parse(dataFile);
  return parsedData;
};

router
  .route("/")
  // Fetching a list of data
  .get((req, res) => {
    const listingsData = readData("./data/listings.json");
    res.status(200).json(listingsData);
  })
  // Creating a listing item
  .post((req, res) => {
    if (!req.body.address || !req.body.price || !req.body.postalCode) {
      return res
        .status(404)
        .json({ message: "Missing address, price, or postal code" });
    }
    const generatedId = uniqid();
    const listingsData = readData("./data/listings.json");
    const newListing = {
      id: generatedId,
      address: req.body.address,
      price: req.body.price,
      available: true,
      postalCode: req.body.postalCode,
    };
    listingsData.push(newListing);
    fs.writeFileSync("./data/listings.json", JSON.stringify(listingsData));

    res.status(201).json({ createdId: generatedId });
  });

router
  .route("/:id")
  // Fetching a single listing
  .get((req, res) => {
    const listingsData = readData("./data/listings.json");
    const listingId = req.params.id;
    const filteredListing = listingsData.find(
      (listing) => String(listing.id) === listingId
    );
    res.status(200).json(filteredListing);
  })
  // Update a single listing
  .put((req, res) => {
    const listingsData = readData("./data/listings.json");
    const listingId = req.params.id;
    const selectedListingItem = listingsData.find(
      (listing) => listing.id === listingId
    );
    if (!selectedListingItem) {
      res.status(404).json({ message: "Item not Found" });
      return;
    }
    selectedListingItem.address = req.body.address;
    selectedListingItem.price = req.body.price;
    selectedListingItem.available = req.body.available;
    selectedListingItem.postalCode = req.body.postalCode;

    fs.writeFileSync("./data/listings.json", JSON.stringify(listingsData));

    res.status(200).json({ updatedId: listingId });
  })
  // Delete a single listing
  .delete((req, res) => {
    const listingsData = readData("./data/listings.json");
    const listingId = req.params.id;
    const selectedListingItem = listingsData.find(
      (listing) => listing.id === listingId
    );
    if (!selectedListingItem) {
      res.status(404).json({ message: "Item not Found" });
      return;
    }
    const filteredListings = listingsData.filter(
      (listing) => listingId !== listing.id
    );

    fs.writeFileSync("./data/listings.json", JSON.stringify(filteredListings));

    res.status(200).json({ message: `Deleted Item ${listingId}` });
  });

module.exports = router;
