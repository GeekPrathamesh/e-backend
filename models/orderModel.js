import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
userId:{type:String,required:true},
items:{type:Array,required:true},
amount:{type:Number,required:true},
payment:{type:Boolean,default:false},
address:{type:Object,required:true},
status:{type:String,default:"Food is under process"},
date:{type:Date,default:Date.now}
})

const orderModel = mongoose.models.Orders || mongoose.model("Orders", orderSchema);
export {orderModel};