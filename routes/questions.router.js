const {
  getQuestions,
  getTodaysQuestions,
} = require("../controllers/questions.controllers");

const questionsRouter = require("express").Router();

questionsRouter.route("/").get(getQuestions);
questionsRouter.route("/today").get(getTodaysQuestions);

module.exports = questionsRouter;
