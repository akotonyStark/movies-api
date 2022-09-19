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
directorSchema.methods.validateUpdate = async function () {
  const query = this
  const directorObj = query.toObject()
  let allowedUpdates = ['first_name', 'last_name']
  let updatesFromBody = Object.keys(directorObj)
  const isValidUpdate = updatesFromBody.some((update) =>
    allowedUpdates.includes(update)
  )
  if (!isValidUpdate) {
    throw new Error({ error: 'Invalid update' })
  }
  try {
    const { id } = query.id
    const director = await Director.findById(id)

    updatesFromBody.forEach((update) => {
      director[update] = query[update]
    })
    await director.save()

    if (!director) {
      throw new Error({ message: 'Unable to update' })
    }
    return director
  } catch (error) {
    throw new Error(error)
  }
}

const Director = mongoose.model('Director', directorSchema)
module.exports = Director
