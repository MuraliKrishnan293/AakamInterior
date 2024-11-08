const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const SECRETKEY = "ABCDEFG";
// const crypto = require("crypto");
// const { EmailHelper } = require("./EmailHelper");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword
      });
      
      await user.save();
      return res.status(200).json();

    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const authToken = jwt.sign({ id: user.id }, SECRETKEY, {
      expiresIn:'24h'
    });

    res
      .status(200)
      .json({
        success: true,
        authToken: authToken,
        id: user.id,
        name: user.username,
        email: user.email
      });
      // console.log(res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;