import express from "express";

const authRouter = express.Router();
import bcrypt from "bcrypt";
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"


authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const notnewUser = await User.findOne({ email });
    if (notnewUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: bcryptPassword,
    });

    const token = jwt.sign({id:user._id},process.env.SECRET, { expiresIn: "7d" })


    res.status(201).json({
      success: true,
      message: "User created successfully",
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const userFind = await User.findOne({ email });
    if (!userFind) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists create a new account",
      });
    }

    const passwordDB = userFind.password

    // hash password check
    const correctPassword = await bcrypt.compare(password,passwordDB);

    if(!correctPassword){
      return res.status(400).json({success:false,message:"invalid password"})
    }

        const token = jwt.sign({id:userFind._id},process.env.SECRET, { expiresIn: "7d" })


     res.status(200).json({
      success: true,
      message: "Login successful",token

    });

   
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default authRouter;
