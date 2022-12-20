const {
  fetchQuestions,
  fetchTodaysQuestions,
} = require("../models/questions.models");

exports.getQuestions = (req, res, next) => {
  fetchQuestions()
    .then((questions) => {
      res.status(200).send({ questions });
    })
    .catch(next);
};

exports.getTodaysQuestions = (req, res, next) => {
  fetchTodaysQuestions()
    .then((questions) => {
      res.status(200).send({ questions });
    })
    .catch(next);
};
