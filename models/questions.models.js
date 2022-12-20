const db = require("../db/connection");
const QuestionModel = require("../db/schemas/questionsSchema");
const axios = require("axios");

exports.fetchQuestions = async () => {
  const questions = await db.then(async (mongoose) => {
    const result = await QuestionModel.find({});
    return result;
  });
  return questions;
};

exports.fetchTodaysQuestions = async () => {
  const todaysDate = new Date().toISOString().split("T")[0];
  const questions = await db.then(async (mongoose) => {
    const result = await QuestionModel.find({
      dateAsked: todaysDate,
    });
    return result;
  });
  if (!questions.length) {
    return await this.insertTodaysQuestions();
  }
  return questions;
};

exports.insertTodaysQuestions = async () => {
  const todaysDate = new Date().toISOString().split("T")[0];
  const res = await axios.get(
    "https://the-trivia-api.com/api/questions?limit=5"
  );
  const questionsToInsert = res.data.map((question) => {
    const newQuestion = { ...question, dateAsked: todaysDate };
    return newQuestion;
  });
  await QuestionModel.insertMany(questionsToInsert);
  return questionsToInsert;
};
