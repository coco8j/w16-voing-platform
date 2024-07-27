const express = require("express");
const router = express.Router();
const {
  auth,
  deleteVote,
  getVoteInfo,
  createVote,
  renderVotingLookup,
  makeVote
} = require("./middleware");

router.get("/new", auth, function (req, res, next) {
  res.render("votingCreate", { message: "양식을 입력해 주세요." });
});

router.post("/new", auth, createVote, function (req, res, next) {
  res.redirect("/votings/success");
});

router.get("/success", auth, function (req, res, next) {
  res.render("success", { title: "voting success" });
});

router.get("/error", auth, function (req, res, next) {
  res.render("error", { message: "투표 생성에 실패했습니다." });
});

router.get("/:id", getVoteInfo, renderVotingLookup);
router.post("/:id", auth, makeVote);
router.delete("/:id", deleteVote);

module.exports = router;
