const db = require("../db/connection");
const UserModel = require("../db/schemas/usersSchema");

exports.fetchUserByUserId = async (userId) => {
  const user = await UserModel.find({ userId });
  if (user.length === 0) {
    return Promise.reject({
      status: 400,
      msg: "Not Found",
    });
  }
  return user;
};

exports.removeUserByUserId = async (userId) => {
  await UserModel.deleteOne({ userId });
};
