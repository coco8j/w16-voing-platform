const Vote = require("../../models/vote");

const deleteVote = async function (req, res, next) {
  try {
    const voteId = req.params.id;

    await Vote.findOneAndDelete({ _id: voteId });

    res.send({ message: "삭제 완료" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteVote;
