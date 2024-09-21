const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

// User registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkUser = await userModel.findOne({ email: email });

    if (checkUser) {
      return res.status(200).json({ message: "User Already Exists" });
    } else {
      const newUser = new userModel({ name, email, password });
      const user = await newUser.save();
      res
        .status(201)
        .json({ message: "User Registered Successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email, password: password });

    const temp = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
    };

    if (temp) {
      return res.status(200).json({ message: "Login Successful", data: temp });
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const data = await userModel.find({});

    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
