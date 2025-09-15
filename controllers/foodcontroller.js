import foodModel from "../models/foodModel.js";
import fs from "fs";

export const addFood = async (req, res) => {
  const image_filename = req.file.filename;

  const newFood = new foodModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    imageUrl: image_filename,
  });

  try {
    await newFood.save();
    res
      .status(201)
      .json({ success: true, message: "saved successfully", newFood });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listFood = async (req, res) => {
  try {
    const foodList = await foodModel.find({});
    res.status(200).json({ success: true, data:foodList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

        if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }


fs.unlink(`uploads/${food.imageUrl}`, (err) => {
  if (err) {
    console.error("Error deleting file:", err.message);
  }
});

    await foodModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "fooditem deleted from db" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message , mes:"gadbad" });
  }
};
