const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título de la película es obligatorio'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'El director de la película es obligatorio'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio']
  },
  genre: {
    type: [String],
    default: []
  },
  duration: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
MovieSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' || error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Ya existe una película con este título. Por favor, usa un título diferente.'));
  } else {
    next(error);
  }
});




module.exports = mongoose.model('Movie', MovieSchema);