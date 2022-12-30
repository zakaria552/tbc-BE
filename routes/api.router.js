const apiRouter = require("express").Router();
const questionsRouter = require("./questions.router");
const usersRouter = require("./users.router");
const leaderboardRouter = require("./leaderboard.router");
const endPoints = require("../api");
apiRouter.get("/", (req, res, next) => {
    res.status(200).send(endPoints);
});
apiRouter.use("/questions", questionsRouter);
apiRouter.use("/leaderboard", leaderboardRouter);
apiRouter.use("/users", usersRouter);


module.exports = apiRouter;
