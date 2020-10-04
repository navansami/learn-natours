const mongoose = require('mongoose');
const config = require('config');

const DB = config
  .get('mongoURI')
  .replace('<password>', config.get('db_passwd'))
  .replace('<dbname>', config.get('db_name'));

const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const connect = async () => {
  await mongoose
    .connect(DB, dbOptions)
    .then(() => console.log(`connected to database: ${config.get('db_name')}`))
    .catch(err => console.log('error occured: ', err));
};

module.exports = connect;
