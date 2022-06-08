import asyncHandler from "express-async-handler";
import House from "../models/houseModel.js";

export const addHouse = asyncHandler(async (req, res) => {
  console.log(req.files);
  const bathrooms = req.body.bathrooms;
  const bedrooms = req.body.bedrooms;
  const balcony = req.body.balcony;
  const photos = req.file.filename;

  const newHouseData = {
    bathrooms,
    bedrooms,
    balcony,
    photos,
  };

  const dbHouse = new House(newHouseData);

  dbHouse.save(function (err) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({ message: "House uploaded successfully" });
    }
  });
});

export const getHouse = asyncHandler(async (req, res) => {
  const houses = await House.find();
  const src = houses[3].photos;
  res.send(src);
});
