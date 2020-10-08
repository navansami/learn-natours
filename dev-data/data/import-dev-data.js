const fs = require('fs');
const mongoose = require('mongoose');
const config = require('config');
const Tour = require('../../models/Tours');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

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

const importData = async () => {
  try {
    connect();
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    connect();
    await Tour.deleteMany();
    console.log('Data successfully cleansed!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
