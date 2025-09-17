import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({

})

const orderModel = mongoose.model("Orders",orderSchema);
export {orderModel};