const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  userId: {type: String, required: true},
  username: {type: String, required: true},
  currentStreak: Number,
  highestScore: Number,
  dateLastPlayed: String,
  todayStats: {
    date: String,
    score: Number,
    timeTaken: String,
    correctAns: Number,
  },
  historyStats: Array,
  achievements: Array,
  friends: Array,
  leaderBoards: Array,
});

const UsersModel = mongoose.model("user", usersSchema);
module.exports = UsersModel;
