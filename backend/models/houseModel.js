import mongoose from "mongoose";

const houseSchema = mongoose.Schema(
  {
    photos: {
      type: String,
      required: [true, "Upload at least 4 photos"],
    },
    price: {
      type: String,
      required: [true, "Enter a price"],
    },
    location: {
      type: String,
      required: [true, "Enter a location"],
    },
    bedrooms: {
      type: String,
      required: [true, "Enter bedroom number"],
    },
    bathrooms: {
      type: String,
      required: [true, "Enter bathroom number"],
    },
    details: {
      type: String,
      required: [true, "Enter additional details"],
    },
    balcony: {
      type: Boolean,
      required: [true, "Is there a balcony?"],
    },
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);

export default House;
