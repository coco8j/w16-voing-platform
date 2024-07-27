const Vote = require("../../models/vote");

const getVoteInfo = async function (req, res, next) {
  try {
    const voteId = req.params.id;
    const voteInfo = await Vote.findOne({ _id: voteId }).lean();

    req.VoteInfo = voteInfo;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getVoteInfo;
