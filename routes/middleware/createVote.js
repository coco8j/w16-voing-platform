const formatExtraOption = require("../../public/utils/formatExtraOptions");
const Vote = require("../../models/vote");

const createVote = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const voteInfo = req.body;

    const { title, dueDate, option1, extraOptions } = voteInfo;
    const options = formatExtraOption(option1, extraOptions);
    const newOptions = options.map((optionName) => { return { title: optionName }});

    const newVote = new Vote({
      title,
      dueDate,
      options: newOptions,
      proposer: userId
    })

    await newVote.save();

    next();
  } catch(error) {
    if (error?.errors) {
      res.render("votingCreate", { message: error.errors.dueDate.message });
      return;
    }

    next(error);
  }
}

module.exports = createVote;
