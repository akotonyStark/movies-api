const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  releaseYear: {
    type: Integer,
    required: true,
  },
  director: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Director',
  },
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
