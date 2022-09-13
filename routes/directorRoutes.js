const express = require('express')
const router = express.Router()
const Director = require('../models/Director')

router.get('/directors', async (req, res) => {
  try {
    const directors = await Director.find({})
    if (directors) {
      res.send(directors)
    } else {
      res.status(404).send({ message: 'No data' })
    }
  } catch (e) {
    res.send(e)
  }
})

router.get('/director/:id', async (req, res) => {
  try {
    const { id } = req.params
    const director = await Director.findById(id)
    if (director) {
      res.send(director)
    } else {
      res.status(404).send({ message: 'No results found' })
    }
  } catch (e) {
    res.send(e)
  }
})

router.post('/director', async (req, res) => {
  try {
    const director = new Director(req.body)
    if (director) {
      await director.save()
      res.status(201).send(director)
    } else {
      res.send({ message: 'Director could not be created' })
    }
  } catch (e) {
    res.send(e)
  }
})

module.exports = router
