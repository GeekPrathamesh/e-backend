import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv"
import cartRoutes from "./routes/cartRoutes.js";


//app config
const app=express();
const port = 4000;
dotenv.config();

//database connection
connectDB()

// middleware 
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/food",foodRouter)
app.use("/api/Auth",authRouter)
app.use("/api/cart",cartRoutes)
app.use("/images",express.static("uploads"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


