const devData = require("../data/dev-data/dev-questions");
const seed = require("./seed");
const db = require("../connection");

const runSeed = () => {
  seed(devData).then((mongoose) => {
    mongoose.connection.close();
  });
};

runSeed();
