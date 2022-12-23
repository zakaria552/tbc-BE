const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");
const usersRouter = require("./users.router")

apiRouter.use("/questions", questionsRouter);
apiRouter.use("/users", usersRouter)

module.exports = apiRouter;
