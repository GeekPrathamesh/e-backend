import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";


//app config
const app=express()
const port = 4000;

//database connection
connectDB()

// middleware 
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


