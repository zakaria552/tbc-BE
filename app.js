const express = require("express");
const { handleCustomErrors, handleDefaultErrors, handleMongoDbErrors } = require("./errors");
const apiRouter = require("./routes/api.router");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api", apiRouter);
// Error handling

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route does not exist" });
});

app.use(handleCustomErrors);
app.use(handleMongoDbErrors)
app.use(handleDefaultErrors);

module.exports = app;
