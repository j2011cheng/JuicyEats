const Listings = require('../data/listings');
const asyncHandler = require('express-async-handler');

// get all listings
exports.getListings = asyncHandler(async(req, res) => {
    const listings = await Listings.find().lean();
    // no listings found
    if (!listings?.length) {
        return res.status(404).send();
    }
    res.status(200).json(listings);
});

// get single listing by id
exports.getListing = asyncHandler(async(req, res) => {
    const listing = await Listings.findById(req.params.id).lean();
    // listing id not found
    if (!listing) {
        return res.status(404).send();
    }
    res.status(200).send(listing);
});

// create new listing
exports.postListing = async (req, res) => {
    const listing = await Listings.create(req.body);
    if (listing) {
        return res.status(201).send();
    }
    res.status(400).send();
};

// update existing listing by id
exports.updateListing = async (req, res) => {
    const listing = await Listings.findById(req.params.id).exec();
    // listing id not found
    if (!listing) {
        return res.status(404).send();
    }
    listing.title = req.body.title || listing.title;
    listing.price = req.body.price || listing.price;
    listing.available = req.body.available || listing.available;
    const updated = await listing.save();
    if (!updated) {
        return res.status(400).send();
    }
    res.status(200).send();
};

// delete listing by id
exports.deleteListing = async (req, res) => {
    const listing = await Listings.findById(req.params.id).exec();
    // listing id not found
    if (!listing) {
        return res.status(404).send();
    }
    const deleted = await listing.deleteOne();
    if (!deleted) {
        return res.status(400).send();
    }
    res.status(200).send();
}
