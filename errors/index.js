exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};
exports.handleMongoDbErrors = (err, req, res, next) => {
  // patch
  if(err.valueType === "Array" || err.valueType === "Object" ) {
    res.status(400).send({ msg: "wrong data type for required field" })
  }
  // post
  const errors = Object.keys(err.errors)
  for(let i = 0; i < errors.length; i++) {
    if (err.errors[errors[i]].kind === "required") {
      res.status(400).send({ msg: "missing required field" });
      break;
    } else if (err.errors[errors[i]].valueType === "Array" || err.errors[errors[i]].valueType === "Object") {
      res.status(400).send({ msg: "wrong data type for required field" });
      break
    } else {
      next(err)
      break
    }
  }
  // Object.keys(err.errors).forEach((errField) => {
  // })
  
}
exports.handleDefaultErrors = (err, req, res, next) => {
  console.log(err, "UNHANDLED ERROR");
  res.status(500).send("Server error");
};
