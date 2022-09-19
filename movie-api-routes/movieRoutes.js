const express = require('express')
const { validateMovieUpdate } = require('../middleware/validationMiddleware')
const router = express.Router()
const Movie = require('../models/Movie')

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
router.put('/movie/:id', validateMovieUpdate, async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  res.status(200).send(movie)
})

module.exports = router
