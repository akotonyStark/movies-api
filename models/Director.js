const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
})

const Director = mongoose.model('Director', directorSchema)
module.exports = Director
