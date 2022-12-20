const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");

apiRouter.use("/questions", questionsRouter);

module.exports = apiRouter;
