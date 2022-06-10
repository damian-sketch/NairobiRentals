import mongoose from "mongoose";

const houseSchema = mongoose.Schema(
  {
    bathrooms: {
      type: String,
      required: [true],
    },
    bedrooms: {
      type: String,
      required: [true],
    },
    balcony: {
      type: String,
      required: [true],
    },
    photos: {
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
