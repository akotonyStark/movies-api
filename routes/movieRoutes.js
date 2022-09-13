const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({})
    if (movies) {
      res.send(movies)
    } else {
      res.status(404).send({ message: 'No data' })
    }
  } catch (e) {
    res.send(e)
  }
})

router.get('/movie/:id', async (req, res) => {
  try {
    const { id } = req.params
    const movie = await movie.findById(id)
    if (movie) {
      res.send(movie)
    } else {
      res.status(404).send({ message: 'No results found' })
    }
  } catch (e) {
    res.send(e)
  }
})

router.post('/movie', async (req, res) => {
  try {
    const movie = new movie(req.body)
    if (movie) {
      await movie.save()
      res.status(201).send(movie)
    } else {
      res.send({ message: 'movie could not be created' })
    }
  } catch (e) {
    res.send(e)
  }
})

module.exports = router
