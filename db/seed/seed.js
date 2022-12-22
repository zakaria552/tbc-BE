const db = require("../connection");
const QuestionModel = require("../schemas/questionsSchema");
const LeaderboardModel = require("../schemas/leaderboardSchema");
const UsersModel = require("../schemas/usersSchema");

const seed = ({ questionData, leaderboardData, usersData }) => {
  return db.then(async (mongoose) => {
    await mongoose.connection.db.dropDatabase();
    // await mongoose.connection.db.createCollection("questions");
    // await mongoose.connection.db.createCollection("leaderboards");
    // await mongoose.connection.db.createCollection("users");
    await QuestionModel.insertMany(questionData);
    await LeaderboardModel.insertMany(leaderboardData);
    await UsersModel.insertMany(usersData);
    return mongoose;
  });
};

module.exports = seed;
