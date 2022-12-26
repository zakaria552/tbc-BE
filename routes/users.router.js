const {
  getUserById,
  deleteUserByUserId,
  postUser,
  patchUser,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/:userId").get(getUserById);
usersRouter.route("/:userId").delete(deleteUserByUserId);

usersRouter.route("/").post(postUser)
usersRouter.route("/:userId").patch(patchUser)

module.exports = usersRouter

