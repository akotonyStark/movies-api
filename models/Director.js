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

//middleware to validate update properties
directorSchema.methods.validateUpdate = async function () {}

const Director = mongoose.model('Director', directorSchema)
module.exports = Director
