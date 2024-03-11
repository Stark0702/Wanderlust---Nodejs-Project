const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const Review = require("./review.js");

// Rest of your code...

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
  price: Number,
  location: String,
  country: String,
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
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
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

// image: {
//   type: String,
//   default: path.join(__dirname, "image", "static.jpg"), // Adjust the filename accordingly
//   set: function (v) {
//     if (!v || v.trim() === "") {
//       console.log("Empty image URL provided. Using default.");
//       return path.join(__dirname, "image", "static.jpg"); // Replace with your actual default image path
//     } else {
//       // Log the image URL for debugging
//       console.log("Using provided image URL:", v);
//       return v;
//     }
//   },
// },
