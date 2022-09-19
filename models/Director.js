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
directorSchema.methods.validateUpdate = function () {
  const director = this
  const directorObj = director.toObject()
  let allowedUpdates = ['first_name', 'last_name']
  let updatesFromBody = Object.keys(directorObj)
  const isValidUpdate = updatesFromBody.every((update) =>
    allowedUpdates.includes(update)
  )
  return isValidUpdate
}

const Director = mongoose.model('Director', directorSchema)
module.exports = Director
