const db = require("../db/connection");
const QuestionModel = require("../db/schemas/questionsSchema");
const LeaderboardModel = require("../db/schemas/leaderboardSchema");

exports.deleteOldQuestions = () => {
  db.then(async () => {
    const date = new Date().getTime();
    const questions = await QuestionModel.find({});
    const questionDelete = questions.filter((question) => {
      const questionDate = new Date(question.dateAsked).getTime();
      const dateDifference = Math.floor(
        (date - questionDate) / 1000 / 60 / 60 / 24
      );
      if (dateDifference > 30) return dateDifference;
    });

    const promises = questionDelete.map((question) => {
      return QuestionModel.deleteOne({ id: question.id });
    });
    await Promise.all(promises);
  });
};

exports.resetGlobalLeaderboard = async () => {
  const boards = await LeaderboardModel.find();
  const todaysDate = new Date().toISOString().split("T")[0];
  await LeaderboardModel.deleteMany();

  boardPromises = boards.map(board => {
    LeaderboardModel.insertMany({
      date: todaysDate,
      members: [],
      leaderboardName: board.leaderboardName
    });
  });

  await Promise.all(boardPromises);
};