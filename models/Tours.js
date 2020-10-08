const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour needs a name'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'a tour needs a price']
  },
  priceDiscount: Number,
  duration: {
    type: Number,
    required: [true, 'A Tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A Tour must have a difficulty level']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
    required: [true, 'A tour must have a description'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a color image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

module.exports = mongoose.model('Tours', tourSchema);
