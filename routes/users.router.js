const { getUser } = require("../controllers/users.controllers")

const usersRouter = require("express").Router()

usersRouter.route("/").post(getUser)

module.exports = usersRouter