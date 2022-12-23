const db = require("../db/connection");
const seed = require("../db/seed/seed");
const testData = require("../db/data/test-data/");
const request = require("supertest");
const app = require("../app");
const QuestionModel = require("../db/schemas/questionsSchema");
const UsersModel = require("../db/schemas/usersSchema");

beforeEach(async () => {
  await seed(testData);
});
afterAll(() => {
  db.then((mongoose) => {
    mongoose.connection.close();
  });
});

describe("/*", () => {
  test("GET - 404: Responds with 404 not found error when passed a bad path", () => {
    return request(app)
      .get("/api/something_bad")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route does not exist");
      });
  });
});

describe("GET /questions", () => {
  test("GET - 200: Responds with an array of all questions", () => {
    return request(app)
      .get("/api/questions")
      .expect(200)
      .then(({ body }) => {
        expect(body.questions.length).toBeGreaterThan(0);
        body.questions.forEach((question) => {
          expect(question).toMatchObject({
            category: expect.any(String),
            id: expect.any(String),
            correctAnswer: expect.any(String),
            incorrectAnswers: expect.any(Array),
            question: expect.any(String),
            dateAsked: expect.any(String),
          });
        });
      });
  });
});

describe("GET /questions/today", () => {
  test("GET - 200: Always returns an array of question objects with a dateAsked value of today's date", () => {
    const todaysDate = new Date().toISOString().split("T")[0];
    return request(app)
      .get("/api/questions/today")
      .expect(200)
      .then(({ body }) => {
        expect(body.questions.length).toBe(5);
        body.questions.forEach((question) => {
          expect(question).toMatchObject({
            category: expect.any(String),
            id: expect.any(String),
            correctAnswer: expect.any(String),
            incorrectAnswers: expect.any(Array),
            question: expect.any(String),
            dateAsked: todaysDate,
          });
        });
      });
  });
  test("DELETE messages older than specified time", () => {
    return request(app)
      .get("/api/questions/today")
      .then(async () => {
        const questions = await QuestionModel.find();
        expect(questions.length).toBe(7);
      });
  });
  test("GET - 200: fetchs unique daily questions from trivia api", () => {
    return request(app)
      .get("/api/questions/today")
      .expect(200)
      .then(async () => {
        const allQuestionDbId = await QuestionModel.find({}).select("id");
        const areUnique =
          new Set(allQuestionDbId).size === allQuestionDbId.length;
        expect(areUnique).toBe(true);
      });
  });
});

describe("users/:userId", () => {
  test("GET:200 responds with a user object", () => {
    return request(app)
      .get("/api/users/4")
      .expect(200)
      .then(({ body }) => {
        expect(body.user[0]).toMatchObject({
          userId: expect.any(String),
          username: "dan",
          _id: expect.any(String),
          currentStreak: expect.any(Number),
          highestScore: expect.any(Number),
          dateLastPlayed: expect.any(String),
          todayStats: {
            date: expect.any(String),
            score: expect.any(Number),
            timeTaken: expect.any(String),
            correctAns: expect.any(Number),
          },
          historyStats: expect.any(Array),
          achievements: expect.any(Array),
          friends: expect.any(Array),
          leaderBoards: expect.any(Array),
          __v: expect.any(Number),
        });
      });
  });
  test("DELETE: 204 responds with status code", () => {
    return request(app)
      .delete("/api/users/3")
      .expect(204)
      .then(async () => {
        const users = await UsersModel.find();
        expect(users.length).toBe(3);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.not.objectContaining({ username: "fel" })
          );
        });
      });
  });
  test("GET:400 respondes with appropriate message when id is invalid", () => {
    return request(app)
      .get("/api/users/nonsense")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Not Found" });
      });
  });
});


describe("post a new user", () => {
  test(":( POST - 400 returns bad request for missing required field", () => {
    return request(app)
      .post("/api/users")
      .send({userame: "sak", usrId: {"6": 3}})
      .expect(400)
      .then(({body}) => {
        expect(body).toEqual({msg: "missing required field"})
      })
  })
  test(":( POST - 400 given required field but the wrong data type returns bad request", () => {
    return request(app)
      .post("/api/users")
    .send({userame: false, userId: {"6": 3}})
      .expect(400)
      .then(({body}) => {
        expect(body).toEqual({msg: "wrong data type for required field"})
      })
  })
  test(":) POST - 200 returns user object", () => {
    return request(app)
      .post("/api/users")
      .send({username: "fly", userId: "5"})
      .expect(200)
      .then(({body}) => {
        expect(body.user).toMatchObject({
          userId: "5",
          username: "fly",
        });
      })
  })
})

