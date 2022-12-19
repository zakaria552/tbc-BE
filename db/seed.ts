const connectDb = require("./connection.ts");

const testData = require("./data/test-data.ts");

const seed = (data) => {
  connectDb().then(async (mongoose) => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.db.createCollection("questions");
    await questionsSchema.insertMany(data);

    // const collections = await mongoose.connection.db
    //   .listCollections()
    //   .toArray()
    //   .then((res) => {
    //     console.log(res);
    //   });
    mongoose.connection.close();
  });
};

seed(testData);
