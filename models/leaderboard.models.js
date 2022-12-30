const db = require("../db/connection");
const LeaderboardModel = require("../db/schemas/leaderboardSchema");

exports.fetchLeaderboard = async (leaderboardName) => {
    const leaderboard = await LeaderboardModel.find({ leaderboardName }, { members: { $slice: 10 } });
    const sorted = leaderboard[0].members.sort((a, b) => {
        return b.todayStats.score - a.todayStats.score;
    });
    leaderboard[0].members = sorted;
    return leaderboard;
};

exports.insertLeaderboard = async (leaderboardName) => {
    const leaderboard = await LeaderboardModel.find({ leaderboardName });
    const today = new Date().toISOString().split("T")[0];
    if (leaderboard.length > 0) {
        return Promise.reject({
            status: 400,
            msg: "use other leaderboard name",
        });
    } else {
        const newLeaderboard = {
            date: today,
            members: [],
            leaderboardName
        };
        const insertedPlay = await LeaderboardModel.insertMany(newLeaderboard);
        return insertedPlay;
    }
};

exports.updateLeaderboard = async (leaderboardName, newMember) => {
    const addToLeaderboard = await LeaderboardModel.findOneAndUpdate(
        { leaderboardName },
        { $addToSet: { members: newMember } },
        { upsert: true, new: true }
    );
    const addedMemberIndex = addToLeaderboard.members.length;
    return addToLeaderboard.members[addedMemberIndex - 1];
};