import express from "express";
import multer from "multer";
import {addFood, deleteFood, listFood} from "../controllers/foodcontroller.js";

const foodRouter = express.Router();

// Configure multer (store in "uploads/" folder)
const storage = multer.diskStorage({
  destination: "uploads",

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to add food
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood );
foodRouter.post("/deleteitem",deleteFood );

export default foodRouter;
