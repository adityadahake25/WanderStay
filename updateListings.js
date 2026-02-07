// Load env file
require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

// Get token from .env
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

const updateListings = async () => {
    const listings = await Listing.find({});
    for (let listing of listings) {
        if (!listing.geometry || !listing.geometry.coordinates.length) {
            const geoData = await geocodingClient.forwardGeocode({
                query: listing.location,
                limit: 1
            }).send();

            if (geoData.body.features.length > 0) {
                listing.geometry = geoData.body.features[0].geometry;
                await listing.save();
                console.log(`Updated listing: ${listing.title}`);
            } else {
                console.log(`No location found for: ${listing.title}`);
            }
        }
    }
    mongoose.connection.close();
};

updateListings();
