const db = require("../db/connection");
const seed = require("../db/seed/seed");
const testData = require("../db/data/test-data/");
const request = require("supertest");
const app = require("../app");
const QuestionModel = require("../db/schemas/questionsSchema");
const UsersModel = require("../db/schemas/usersSchema");
const LeaderboardModel = require("../db/schemas/leaderboardSchema");
const endPoints = require("../api");


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
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "user not Found" });
      });
  });
});

describe("post a new user", () => {
  test(":( POST - 400 returns bad request for missing required field", () => {
    return request(app)
      .post("/api/users")
      .send({ userame: "sak", usrId: { "6": 3 } })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "missing required field" });
      });
  });
  test(":( POST - 400 given required field but the wrong data type returns bad request", () => {
    return request(app)
      .post("/api/users")
      .send({ userame: false, userId: { "6": 3 } })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "wrong data type for required field" });
      });
  });
  test(":) POST - 200 returns user object", () => {
    return request(app)
      .post("/api/users")
      .send({ username: "fly", userId: "5" })
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          userId: "5",
          username: "fly",
        });
      });
  });
});

describe("patch the users details", () => {
  test(":( Patch - given invalid userid returns user not found", () => {
    return request(app)
      .patch("/api/users/432")
      .send({ username: "jack" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("user not found");
      });
  });
  test(":( Patch - given invalid schema type to returns bad request", () => {
    return request(app)
      .patch("/api/users/1")
      .send({ username: { name: "jack" } })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("wrong data type for required field");
      });
  });
  test(":) Patch - given valid userid and valid schema data type updates the user", () => {
    const update = {
      userId: "fdsfsd",
      username: "waffle",
      currentStreak: 1,
      highestScore: 0,
      dateLastPlayed: "12-24-2022",
      todayStats: {
        date: "12-24-2022",
        score: 1,
        timeTaken: "120",
        correctAns: 4,
      },
      historyStats: {
        date: "12-24-2022",
        score: 1,
        timeTaken: "120",
        correctAns: 4,
      },
      achievements: "7 day streak",
      friends: { friend: "j32", addTo: true },
      leaderBoards: { leaderBoard: "global", addTo: true },
    };
    return request(app)
      .patch("/api/users/1")
      .send(update)
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedUser).toEqual({
          userId: "1",
          username: "waffle",
          currentStreak: 1,
          highestScore: 0,
          dateLastPlayed: "12-24-2022",
          todayStats: {
            date: "12-24-2022",
            score: 1,
            timeTaken: "120",
            correctAns: 4,
          },
          historyStats: [{
            date: "12-24-2022",
            score: 1,
            timeTaken: "120",
            correctAns: 4,
          }],
          achievements: ["7 day streak"],
          friends: ["2", "j32"],
          leaderBoards: ["global", "quizNight", "global"],
        });
      });
  });
  test(":) Patch - deletes a friend from a friendlist", () => {
    return request(app)
      .patch("/api/users/2")
      .send({ friends: { friend: "1", addTo: false } })
      .expect(202)
      .then(({ body }) => {
        expect(body.updatedUser.friends).toEqual([]);
      });
  });
});
describe("all available endPoints", () => {
  test("responses with all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endPoints);
      });
  });
});

describe("leaderboards/:leaderboardName", () => {
  test("GET: 200 responds with a leaderboard with max 10 players sorted by score in descending order", () => {
    return request(app)
      .get("/api/leaderboards/global")
      .expect(200)
      .then(({ body }) => {
        expect(body.leaderboard.members.length).not.toBeGreaterThan(10);
        const score = body.leaderboard.members.map(a => a.todayStats.score);
        expect(score).toBeSorted({ descending: true });
      });
  });
  test("POST: 201 creates a leaderboard. Responds with 201 and newly created leaderboard", async () => {
    await LeaderboardModel.deleteMany();
    return request(app)
      .post("/api/leaderboards")
      .send({ leaderboardName: 'global' })
      .expect(201)
      .then(({ body }) => {
        expect(body.leaderboard[0]).toMatchObject({
          date: expect.any(String),
          members: expect.any(Array),
          leaderboardName: 'global',
          _id: expect.any(String),
          __v: expect.any(Number)
        });
      });
  });
  test('PATCH: 200 updates leaderboard members according to passed object. Responds with the newly added member', () => {
    const today = new Date().toISOString();
    const memberPlay = {
      username: "satoshi",
      todayStats: {
        date: today,
        score: 7,
        timeTaken: "200",
        correctAns: 2
      }
    };
    return request(app)
      .patch("/api/leaderboards/global")
      .send(memberPlay)
      .expect(200)
      .then(({ body }) => {
        expect(body.addedMember).toEqual({
          _id: expect.any(String),
          username: 'satoshi',
          todayStats: { date: today, score: 7, timeTaken: '200', correctAns: 2 }
        });
      });
  });
  test('GET: 404 responds with error message when requesting a non-existent leaderboard', () => {
    return request(app)
      .get("/api/leaderboards/globalista")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "leaderboard does not exist" });
      });
  });
  test('PATCH: 404 responds with error message when passed non-existent leaderboard', () => {
    const today = new Date().toISOString();
    const memberPlay = {
      username: "satoshi",
      todayStats: {
        date: today,
        score: 7,
        timeTaken: "200",
        correctAns: 2
      }
    };
    return request(app)
      .patch("/api/leaderboards/globalista")
      .send(memberPlay)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "leaderboard does not exist" });
      });
  });
});

