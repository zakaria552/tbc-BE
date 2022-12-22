const mongoose = require("mongoose")
const leaderboardSchema = mongoose.Schema({
    date: String,
    members: Array, // [{username, todayStats}]
    leaderboardName: String,
})

const LeaderboardModel = mongoose.model("leaderboard", leaderboardSchema)
module.exports = LeaderboardModel