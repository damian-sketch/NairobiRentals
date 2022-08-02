import asyncHandler from "express-async-handler";
import House from "../models/houseModel.js";
import User from "../models/userModel.js";

export const addHouse = asyncHandler(async (req, res) => {
  const house = req.body.newHouse;
  const dbHouse = new House({
    location: house.location,
    rent: house.rent,
    bathrooms: house.bathrooms,
    bedrooms: house.bedrooms,
    balcony: house.balcony,
    photos: house.photos,
    owner: house.owner,
  });

  dbHouse.save(function (err) {
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.json({ message: "House uploaded successfully" });
    }
  });
});

export const getHouse = asyncHandler(async (req, res) => {
  const houses = await House.find();
  res.send(houses);
});

// export const houseDetails = asyncHandler(async (req, res) => {
//   const id = req.body;
//   const details = await House.find();
//   res.send(details[id]);
// });
