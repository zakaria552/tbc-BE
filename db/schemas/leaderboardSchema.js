const mongoose = require("mongoose");
const leaderboardSchema = mongoose.Schema({
  date: { type: Date, required: true },
  members: [{
    username: { type: String, required: true },
    todayStats: {
      date: { type: Date, required: true },
      score: { type: Number, required: true },
      timeTaken: { type: String, required: true },
      correctAns: { type: Number, required: true }
    }
  }],
  leaderboardName: { type: String, required: true },
});

const LeaderboardModel = mongoose.model("leaderboard", leaderboardSchema);
module.exports = LeaderboardModel;
