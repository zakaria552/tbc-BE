exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    console.log(err);
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};
exports.handleMongoDbErrors = (err, req, res, next) => {
  Object.keys(err.errors).forEach((errField) => {
    if (err.errors[errField].kind === "required") {
      res.status(400).send({ msg: "missing required field" });
    } else if (err.errors[errField].valueType === "Array" || err.errors[errField].valueType === "Object") {
      res.status(400).send({ msg: "wrong data type for required field" });
    } else {
      next(err)
    }
  })
}
exports.handleDefaultErrors = (err, req, res, next) => {
  console.log(err, "UNHANDLED ERROR");
  res.status(500).send("Server error");
};
