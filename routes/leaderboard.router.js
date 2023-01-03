const { getLeaderboard, postLeaderboard, patchLeaderboard } = require('../controllers/leaderboards.controllers');

const leaderboardRouter = require("express").Router();

leaderboardRouter.route("/:leaderboardName").get(getLeaderboard);
leaderboardRouter.route("/").post(postLeaderboard);
leaderboardRouter.route("/:leaderboardName").patch(patchLeaderboard);

module.exports = leaderboardRouter;