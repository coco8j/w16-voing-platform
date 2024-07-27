const Vote = require("../../models/vote");

const makeVote = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const voteId = req.params.id;
    const { optionId } = req.body;

    const alreadyVoted = await hasAlreadyVoted(voteId, optionId, userId);

    if (alreadyVoted) {
      res.render("error", { message: "이미 투표에 참여하셨습니다." });
    }

    await Vote.findOneAndUpdate({
      _id: voteId,
      "options.title": optionId,
    }, {
      $push: { "options.$.voters": userId }
    });

    res.redirect(`/votings/${voteId}`);
  } catch (error) {
    next(error);
  }
};

const hasAlreadyVoted = async function (voteId, optionId, userId) {
  const votedOne = await Vote.findOne({
    _id: voteId,
    "options.title": optionId,
    "options.voters": userId
  });

  return !!votedOne;
};

module.exports = makeVote;
