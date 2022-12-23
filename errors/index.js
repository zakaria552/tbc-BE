exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};
exports.handleMongoDbErrors = (err, req, res, next) => {
  Object.keys(err.errors).forEach((errField) => {
    if (err.errors[errField].kind === "required") {
      res.status(400).send({ msg: "missing required field" });
    } else {
      next(err)
    }
  })
}
exports.handleDefaultErrors = (err, req, res, next) => {
  console.log(err, "UNHANDLED ERROR");
  res.status(500).send("Server error");
};
