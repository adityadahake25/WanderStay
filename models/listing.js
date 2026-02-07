const mongoose = require("mongoose");
const Review = require("./review.js");
const { ref, string } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  location: String,
  country: String,
  category: {
    type: [String], // array of strings
    enum: [
      "Trending",
      "Room",
      "Iconic Cities",
      "Mountains",
      "Castles",
      "Amazing Pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Boats",
    ],
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
