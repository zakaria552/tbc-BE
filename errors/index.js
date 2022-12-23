exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    console.log(err);
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handleDefaultErrors = (err, req, res, next) => {
  console.log(err, "UNHANDLED ERROR");
  res.status(500).send("Server error");
};
