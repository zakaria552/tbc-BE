const db = require("../db/connection");
const UsersModel = require("../db/schemas/usersSchema");
const axios = require("axios");

exports.fetchUser = async (user) => {
    const userObj = {
        userId: user.userId,
        username: user.username,
        currentStreak: 0,
        highestScore: 0,
        dateLastPlayed: "",
        todayStats: {
            date: "",
            score: 0,
            timeTaken: "",
            correctAns: 0,
        },
        historyStats: [],
        achievements: [],
        friends: [],
        leaderBoards: [],
    }
    await UsersModel.insertMany(userObj)
    const addedUser = await UsersModel.find({userId: user.userId})
    return addedUser
}