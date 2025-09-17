import express from "express";
import { orderPlace, verifyOrder } from "../controllers/ordercontroller.js";
import { authMiddleware } from "../middleware/auth.js";

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,orderPlace);
orderRouter.post("/verify",verifyOrder);

export {orderRouter}