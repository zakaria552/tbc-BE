const db = require("../db/connection");
const UsersModel = require("../db/schemas/usersSchema");

exports.fetchUserByUserId = async (userId) => {
  const user = await UsersModel.find({ userId });
  if (user.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "user not Found",
    });
  }
  return user;
};

exports.removeUserByUserId = async (userId) => {
  await UsersModel.deleteOne({ userId });
};

exports.insertUser = async (user) => {
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
exports.updateUser = async ({userId}, bodyChanges) => {
  const user = await UsersModel.find({userId})
  if(!user.length) return Promise.reject({
    status: 404,
    msg: "user not found",
  });
  const updatedUser = {
    userId: userId,
    username: bodyChanges.username || user[0].username,
    currentStreak: bodyChanges.currentStreak || user[0].currentStreak,
    highestScore: bodyChanges.highestScore || user[0].highestScore,
    dateLastPlayed: bodyChanges.dateLastPlayed || user[0].dateLastPlayed,
    todayStats: bodyChanges.todayStats || user[0].todayStats,
    historyStats: bodyChanges.historyStats ? [...user[0].historyStats, bodyChanges.historyStats]: user[0].historyStats,
    achievements: bodyChanges.achievements ? [...user[0].achievements, bodyChanges.achievements]: user[0].achievements,
    // friends: bodyChanges.friends ? [...user[0].friends, bodyChanges.friends]: user[0].friends,
    leaderBoards: bodyChanges.leaderBoards ? [...user[0].leaderBoards, bodyChanges.leaderBoards]: user[0].leaderBoards
  }
  if(bodyChanges.friends) {
    if(bodyChanges.friends.addTo) {
      updatedUser.friends = [...user[0].friends, bodyChanges.friends.friend]
    } else {
      const friendIndex = user[0].friends.indexOf(bodyChanges.friends.friend)
      user[0].friends.splice(friendIndex, 1)
      updatedUser.friends = user[0].friends
    }
  }
  if(bodyChanges.leaderBoards) {
    if(bodyChanges.leaderBoards.addTo) {
      updatedUser.leaderBoards = [...user[0].leaderBoards, bodyChanges.leaderBoards.leaderBoard]
    } else {
      const leaderBoardIndex = user[0].leaderBoards.indexOf(bodyChanges.leaderBoards.leaderBoard)
      user[0].leaderBoards.splice(leaderBoardIndex, 1)
      updatedUser.leaderBoards = user[0].leaderBoards
    }
  }

  // leave leaderboard? 
  // adding
  const updated = await UsersModel.updateOne({userId}, {
    $set: updatedUser
  })
  if(updated.modifiedCount = 1) return updatedUser
}