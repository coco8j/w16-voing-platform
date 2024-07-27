const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.render("signup", { title: "signup" });
});

router.post("/", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const SALT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT);
    const newUser = new User({ email: email, password: hashedPassword });
    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).render("error", { message: "회원가입 오류" });
  }
});

module.exports = router;
