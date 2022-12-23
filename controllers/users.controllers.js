const { fetchUser } = require("../models/users.model")

exports.getUser = async (req, res, next) => {
    fetchUser(req.body).then((insertedUser) => {
        res.status(200).send({user: insertedUser[0]})
    }).catch((err) => {
        next(err)
    })
}