import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";


//app config
const app=express();
const port = 4000;


//database connection
connectDB()

// middleware 
app.use(express.json())
app.use(cors({
  origin:[process.env.FRONTEND_URL,process.env.FRONTEND_URL_]
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/food",foodRouter)
app.use("/api/Auth",authRouter)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRouter)
app.use("/images",express.static("uploads"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


