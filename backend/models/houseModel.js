import mongoose from "mongoose";

const houseSchema = mongoose.Schema(
  {
    photos: {
      type: String,
      required: [true],
    },
    bedrooms: {
      type: String,
      required: [true],
    },
    bathrooms: {
      type: String,
      required: [true],
    },
    balcony: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);

export default House;
