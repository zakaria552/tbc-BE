const { getLeaderboard, postLeaderboard, patchLeaderboard } = require('../controllers/leaderboard.controllers');

const leaderboardRouter = require("express").Router();

leaderboardRouter.route("/:leaderboardName").get(getLeaderboard);
leaderboardRouter.route("/:leaderboardName").post(postLeaderboard);
leaderboardRouter.route("/:leaderboardName").patch(patchLeaderboard);

module.exports = leaderboardRouter;