import express from "express";
import {adminOrdersGet , listOrder, orderPlace, updateorderstatus, verifyOrder } from "../controllers/ordercontroller.js";
import { authMiddleware } from "../middleware/auth.js";

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,orderPlace);
orderRouter.post("/verify",verifyOrder);
orderRouter.get("/myorders",authMiddleware,listOrder);


//for admin pannel showing orders and able to update order status
orderRouter.get("/getadminOrders",adminOrdersGet);

//update the order current status
orderRouter.put("/updateorderstatus",updateorderstatus);



export {orderRouter}