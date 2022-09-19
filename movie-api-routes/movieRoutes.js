const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

//get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({})
    if (movies) {
      res.send(movies)
    } else {
      res.status(404).send({ message: 'No data' })
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

//get movie by ID
router.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.where('_id').equals(id).populate('director')
    if (movie) {
      res.send(movie)
    } else {
      res.status(404).send({ message: 'No results found' })
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

//add new movie
router.post('/movie', async (req, res) => {
  try {
    const movie = new Movie(req.body)
    if (movie) {
      await movie.save()
      res.status(201).send(movie)
    } else {
      res.send({ message: 'movie could not be created' })
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

//update movie by ID
router.put('/movie/:id', async (req, res) => {
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
    res.status(200).send(movie)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
