const mongoose = require("mongoose");
const leaderboardSchema = mongoose.Schema({
  date: Date,
  members: Array, // [{username, todayStats}]
  leaderboardName: String,
});

const LeaderboardModel = mongoose.model("leaderboard", leaderboardSchema);
module.exports = LeaderboardModel;
