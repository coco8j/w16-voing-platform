const auth = require("./auth");
const deleteVote = require("./deleteVote");
const getVoteInfo = require("./getVoteInfo");
const createVote = require("./createVote");
const renderVotingLookup = require("./renderVotingLookup");
const makeVote = require("./makeVote");

module.exports = { auth, deleteVote, createVote: createVote, getVoteInfo, renderVotingLookup, makeVote };
