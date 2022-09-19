const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  director: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Director',
  },
})

//middleware to validate update properties
movieSchema.methods.validateUpdate = async function () {}

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
