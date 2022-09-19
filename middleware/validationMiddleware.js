const Director = require('../models/Director')
const Movie = require('../models/Movie')
const validateDirectorUpdate = async (req, res, next) => {
  let allowedUpdates = ['first_name', 'last_name']
  let updatesFromBody = Object.keys(req.body)

  const isValidUpdate = updatesFromBody.every((update) =>
    allowedUpdates.includes(update)
  )

  console.log(isValidUpdate)

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid update' })
  }
  try {
    const { id } = req.params
    const director = await Director.findById(id)

    updatesFromBody.forEach((update) => {
      director[update] = req.body[update]
    })
    await director.save()

    if (!director) {
      return res.status(404).send({ message: 'Unable to update' })
    }
    next()
  } catch (error) {
    res.status(500).send(error)
  }
}

const validateMovieUpdate = async (req, res, next) => {
  let allowedUpdates = ['name', 'release_year', 'director']
  let updatesFromBody = Object.keys(req.body)

  const isValidUpdate = updatesFromBody.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid update' })
  }
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)

    updatesFromBody.forEach((update) => {
      movie[update] = req.body[update]
    })
    await movie.save()

    if (!movie) {
      return res.status(404).send({ message: 'Unable to update' })
    }
    next()
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = { validateDirectorUpdate, validateMovieUpdate }
