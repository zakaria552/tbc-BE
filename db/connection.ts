require("dotenv").config({
  path: `${__dirname}/../test.env`,
});

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); //required to avoid warning
const mongoPath = process.env.ATLAS_URI;

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};
