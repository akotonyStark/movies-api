const express = require('express')
const { validateDirectorUpdate } = require('../middleware/validationMiddleware')
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
    res.status(500).send(e)
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
    res.status(500).send(e)
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
    res.status(500).send(e)
  }
})

//update director by ID
router.put('/director/:id', validateDirectorUpdate, async (req, res) => {
  const director = await Director.findById(req.params.id)
  res.status(200).send(director)
})

module.exports = router
