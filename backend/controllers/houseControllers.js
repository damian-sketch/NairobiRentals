import asyncHandler from "express-async-handler";
import House from "../models/houseModel.js";

export const addHouse = asyncHandler(async (req, res) => {
  const house = req.body;
  const dbHouse = new House({
    photos: house.photos,
    bedrooms: house.bedrooms,
    bathrooms: house.bathrooms,
    balcony: house.balcony,
    price: house.price,
    location: house.location,
    details: house.details,
  });

  dbHouse.save(function (err) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({ message: "House uploaded successfully" });
    }
  });
});
