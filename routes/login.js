const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  res.render("login", { title: "login" });
});

router.post("/",
  passport.authenticate("local", {
    successRedirect: "..",
    failureRedirect: "/votings/new",
    failureMessage: "잘못된 입력입니다."
  })
);

module.exports = router;
