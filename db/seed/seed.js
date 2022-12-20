const db = require("../connection");
const QuestionModel = require("../schemas/questionsSchema");

const seed = (data) => {
  return db.then(async (mongoose) => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.db.createCollection("questions");
    await QuestionModel.insertMany(data);
    console.log("connected");
    return mongoose;
    // const collections = await mongoose.connection.db
    //   .listCollections()
    //   .toArray()
    //   .then((res) => {
    //     console.log(res);
    //   });
  });
};

module.exports = seed;
