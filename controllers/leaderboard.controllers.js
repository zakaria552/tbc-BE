const { fetchLeaderboard, insertLeaderboard, updateLeaderboard } = require("../models/leaderboard.models");

exports.getLeaderboard = (req, res, next) => {
    const { leaderboardName } = req.params;
    fetchLeaderboard(leaderboardName).then((leaderboard) => {
        res.status(200).send({ leaderboard });
    })
        .catch(next);
};

exports.postLeaderboard = (req, res, next) => {
    const { leaderboardName } = req.params;
    insertLeaderboard(leaderboardName).then(leaderboard => {
        res.status(201).send({ leaderboard });
    })
        .catch(next);
};

exports.patchLeaderboard = (req, res, next) => {
    const { leaderboardName } = req.params;
    const newMember = req.body;
    updateLeaderboard(leaderboardName, newMember).then(addedMember => {
        res.status(200).send({ addedMember });
    });
};