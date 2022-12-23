const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");
const userIdRouter = require("./users.router");

apiRouter.use("/questions", questionsRouter);
apiRouter.use("/users", userIdRouter);

module.exports = apiRouter;
