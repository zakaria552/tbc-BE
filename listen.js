const app = require('./app');
const db = require('./db/connection');

const { PORT = 9090 } = process.env;

db.then(() => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
});
