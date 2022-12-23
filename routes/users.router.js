const {
  getUserById,
  deleteUserByUserId,
} = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.route("/:userId").get(getUserById);
usersRouter.route("/:userId").delete(deleteUserByUserId);

module.exports = usersRouter;
