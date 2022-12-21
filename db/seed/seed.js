const db = require('../connection');
const QuestionModel = require('../schemas/questionsSchema');

const seed = ({ questionData }) => {
  return db.then(async (mongoose) => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.db.createCollection('questions');
    await QuestionModel.insertMany(questionData);
    return mongoose;
  });
};

module.exports = seed;
