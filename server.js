const config = require('config');
const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
