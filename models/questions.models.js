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
  console.log("fetching")
  const todaysDate = new Date().toISOString().split("T")[0];
  const allQuestionDbId = await QuestionModel.find({}).select("id")
  const areUnique = true
  const res = await axios.get(
    "https://the-trivia-api.com/api/questions?limit=5"
  );
  res.data.forEach((res) => {
    allQuestionDbId.includes(res.id) ? areUnique = false: ""
  })
  if(areUnique) {
    const questionsToInsert = res.data.map((question) => {
      const newQuestion = { ...question, dateAsked: todaysDate };
      return newQuestion;
    });
    await QuestionModel.insertMany(questionsToInsert);
    return questionsToInsert;
  } else {
    this.insertTodaysQuestions()
  }
};
