const db = require("../db/connection");
const QuestionModel = require("../db/schemas/questionsSchema");

db.then(async (mong) => {
  const date = new Date().getTime();
  const questions = await QuestionModel.find({});
  const questionDelete = questions.filter((question) => {
    const questionDate = new Date(question.dateAsked).getTime();
    const dateDifference = Math.floor(
      (date - questionDate) / 1000 / 60 / 60 / 24
    );
    if (dateDifference > 14) return dateDifference;
  });

  await questionDelete.map((question) => {
    QuestionModel.deleteOne({ id: question.id });
  });

  mong.disconnect();
});
