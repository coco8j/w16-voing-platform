const formatDateTime = require("../../public/utils/formatDateTime");

const renderVotingLookup = async function (req, res, next) {
  try {
    const voteInfo = req.VoteInfo;
    let isProposer = false;

    if (!voteInfo) {
      res.redirect("/");
      return;
    }

    if (voteInfo.proposer.toString() === req.user?._id.toString()) {
      isProposer = true;
    }

    voteInfo.isOnGoing = checkExpireDate(voteInfo.dueDate);
    voteInfo.dueDate = formatDateTime(voteInfo.dueDate);
    const voteResults = calculateVotes(voteInfo);

    delete req.VoteInfo;

    res.render("votingLookup", {
      title: voteInfo.title,
      vote: voteInfo,
      voteResults,
      isProposer
    });
  } catch (error) {
    next(error);
  }
};

const checkExpireDate = function (date) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  return currentDate < targetDate;
};

const calculateVotes = function (vote) {
  const voteResults = vote.options.map((option) => {
    return {
      title: option.title,
      voteCounts: option.voters.length,
    };
  });

  voteResults.sort((a, b) => b.voteCounts - a.voteCounts);

  return voteResults;
};

module.exports = renderVotingLookup;
