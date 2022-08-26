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
