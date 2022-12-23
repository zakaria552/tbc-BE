const {
  fetchUserByUserId,
  removeUserByUserId,
  fetchUser
} = require("../models/users.model");

exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  fetchUserByUserId(userId)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.deleteUserByUserId = (req, res, next) => {
  const { userId } = req.params;
  removeUserByUserId(userId)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
exports.postUser = async (req, res, next) => {
  console.log(req.body)
  fetchUser(req.body).then((insertedUser) => {
      res.status(200).send({user: insertedUser[0]})
  }).catch((err) => {
      next(err)
  })
}
