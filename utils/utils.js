const db = require("../db/connection");
const QuestionModel = require("../db/schemas/questionsSchema");

exports.deleteOldQuestions = () => {
  db.then(async () => {
    const date = new Date().getTime();
    const questions = await QuestionModel.find({});
    const questionDelete = questions.filter((question) => {
      const questionDate = new Date(question.dateAsked).getTime();
      const dateDifference = Math.floor(
        (date - questionDate) / 1000 / 60 / 60 / 24
      );
      if (dateDifference > 14) return dateDifference;
    });

    const promises = questionDelete.map((question) => {
      return QuestionModel.deleteOne({ id: question.id });
    });
    await Promise.all(promises);
  });
};
