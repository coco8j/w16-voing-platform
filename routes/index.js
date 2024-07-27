const express = require("express");
const router = express.Router();
const Vote = require("../models/vote");

const auth = require("./middleware/auth");
const logout = require("./middleware/logout");

const loginRouter = require("./login");
const signupRouter = require("./signup");
const votingsRouter = require("./votings");
const myVotingsRouter = require("./myVotings");

router.use("/login", loginRouter);
router.use("/signup", signupRouter);
router.use("/votings", votingsRouter);
router.use("/my-votings", auth, myVotingsRouter);
router.get("/logout", auth, logout);

router.get("/", async function (req, res, next) {
  try {
    const hasLogin = req.isAuthenticated();
    const allVotes = await Vote.find({}).lean();

    res.render("index", { title: "Vote Platform", votes: allVotes, hasLogin });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
