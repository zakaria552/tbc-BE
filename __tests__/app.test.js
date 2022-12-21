const db = require('../db/connection');
const seed = require('../db/seed/seed');
const testData = require('../db/data/test-data/');
const request = require('supertest');
const app = require('../app');

beforeEach(async () => {
  await seed(testData);
});
jest.setTimeout(20000);
afterAll(() => {
  db.then((mongoose) => {
    mongoose.connection.close();
  });
});

describe('/*', () => {
  test('GET - 404: Responds with 404 not found error when passed a bad path', () => {
    return request(app)
      .get('/api/something_bad')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Route does not exist');
      });
  });
});

describe('GET /questions', () => {
  test('GET - 200: Responds with an array of all questions', () => {
    return request(app)
      .get('/api/questions')
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

describe('GET /questions/today', () => {
  test("GET - 200: Always returns an array of question objects with a dateAsked value of today's date", () => {
    const todaysDate = new Date().toISOString().split('T')[0];
    return request(app)
      .get('/api/questions/today')
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
});
