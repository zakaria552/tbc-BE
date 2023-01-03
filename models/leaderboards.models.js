const db = require("../db/connection");
const LeaderboardModel = require("../db/schemas/leaderboardSchema");

exports.fetchLeaderboard = async (leaderboardName) => {
    const leaderboard = await LeaderboardModel.findOneAndUpdate(
        //findOneAndUpdate required to be able to sort inner array elements
        { leaderboardName },
        {
            $push: {
                members: {
                    $each: [],
                    $sort: { "todayStats.score": -1 },
                    $slice: 10
                }
            }
        },
        { new: true }
    );
    if (leaderboard === null) {
        return Promise.reject({
            status: 404,
            msg: "leaderboard does not exist",
        });
    }
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
    const leaderboard = await LeaderboardModel.find({ leaderboardName });

    if (leaderboard.length === 0) {
        return Promise.reject({
            status: 404,
            msg: "leaderboard does not exist",
        });
    }
    const addToLeaderboard = await LeaderboardModel.findOneAndUpdate(
        { leaderboardName },
        { $addToSet: { members: newMember } },
        { new: true }
    );
    const addedMemberIndex = addToLeaderboard.members.length;
    return addToLeaderboard.members[addedMemberIndex - 1];
};