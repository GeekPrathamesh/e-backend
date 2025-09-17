import express from "express";
import { orderPlace } from "../controllers/ordercontroller.js";
const orderRouter = express.Router()

orderRouter.post("/order",orderPlace);

export {orderRouter}