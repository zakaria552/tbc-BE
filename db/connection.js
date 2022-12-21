const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../${ENV}.env`,
});

if (!process.env.ATLAS_URI) {
  throw new Error('ATLAS_URI not set');
}

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); //required to avoid warning
const mongoPath = process.env.ATLAS_URI;

module.exports = mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// module.exports = async () => {
//   await mongoose.connect(mongoPath, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   return mongoose;
// };
