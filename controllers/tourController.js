const Tours = require('../models/Tours');

exports.getAllTours = async (req, res) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = await Tours.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }

  const tours = await query;

  try {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `Error: ${err}`
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tours.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tours.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newTour
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(202).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  const tour = await Tours.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: {
      tour
    }
  });
};
