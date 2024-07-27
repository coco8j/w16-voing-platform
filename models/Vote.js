const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  voters: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
});

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
    validate: {
      validator: dueDate => new Date(dueDate) > new Date(),
      message: '날짜는 반드시 미래여야 합니다.'
    }
  },
  options: [optionSchema],
  isOnGoing: {
    type: Boolean,
    default: "true",
  },
  proposer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
