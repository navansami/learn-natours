const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour needs a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'a tour needs a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

module.exports = mongoose.model('Tours', tourSchema);
