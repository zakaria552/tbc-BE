const {
  getUserById,
  deleteUserByUserId,
  postUser,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/:userId").get(getUserById);
usersRouter.route("/:userId").delete(deleteUserByUserId);

usersRouter.route("/").post(postUser)

module.exports = usersRouter

