const express = require("express");
const router = express.Router();
const Vote = require("../models/vote");

router.get("/", async function (req, res, next) {
  try {
    const userId = req.user._id;
    const userVotes = await Vote.find({ proposer: userId }).lean();

    res.render("myVotings", { title: "My Votings", votes: userVotes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
