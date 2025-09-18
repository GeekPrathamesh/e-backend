import Stripe from "stripe";
import { orderModel } from "../models/orderModel.js";
import User from "../models/userModel.js";

const orderPlace = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const newOrder = new orderModel({
      userId: req.user,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await User.findByIdAndUpdate(req.user, { cart: [] }, { new: true });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: " error to payment redirect " });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "unpaid" });
    }
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
};

const listOrder = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorize user" });
    }
    const orders = await orderModel.find({ userId: userId });
    if (orders.length === 0) {
      return res.json({ success: true, data: [], message: "No orders found" });
    }

    res.json({
      success: true,
      data: orders,
      message: "orders fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📦 Get all orders (Admin only)
const adminOrdersGet = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

const updateorderstatus = async (req, res) => {
  try {
    const { orderid, status } = req.body;

    if (!orderid || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID and status are required" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderid,
      { status },
      { new: true, runValidators: true } 
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  orderPlace,
  verifyOrder,
  listOrder,
  adminOrdersGet,
  updateorderstatus,
};
