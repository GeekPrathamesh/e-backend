import express from "express";

import { authMiddleware } from "../middleware/auth.js";
import User from "../models/userModel.js";

const cartRoutes = express.Router();

cartRoutes.post("/add", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Example: Add an item to the user's cart
    const { itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID required" });
    }

    // Assuming your user schema has a "cart" array
    user.cart.push(itemId);
    await user.save();

    res.json({ success: true, message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

cartRoutes.post("/remove", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Example: Add an item to the user's cart
    const { itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID required" });
    }

    // Assuming your user schema has a "cart" array
 user.cart = user.cart.filter(
  (itemids) => itemids.toString() !== itemId.toString()
);
await user.save();


    res.json({
      success: true,
      message: "Item remove from cart",
      cart: user.cart,
    });
  } catch (error) {

    res.status(500).json({ success: false, message: "Server error" });
  }
});

cartRoutes.get("/getcart", authMiddleware, async (req, res) => {
    try {
         const user = await User.findById(req.user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartItems = user.cart;
    res.status(200).json({success:true,cartItems})

    } catch (error) {
          res.status(500).json({ success: false, message: "Server error" });  
    }
})
export default cartRoutes;
