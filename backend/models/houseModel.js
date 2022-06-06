import mongoose from "mongoose";

const houseSchema = mongoose.Schema(
  {
    photos: {
      type: String,
      required: [true, "Upload at least 4 photos"],
    },
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);

export default House;
