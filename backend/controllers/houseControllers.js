import asyncHandler from "express-async-handler";
import House from "../models/houseModel.js";

export const addHouse = asyncHandler(async (req, res) => {
  const house = req.body;

  const dbHouse = new House({
    photos: house.url,
  });

  dbHouse.save(function (err) {
    if (err) {
      res.json(err.message);
    } else {
      res.json({ message: "House uploaded successfully" });
    }
  });
});
