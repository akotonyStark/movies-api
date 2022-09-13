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

//update director by ID
router.put('/director/:id', async (req, res) => {
  let allowedUpdates = ['first_name', 'last_name']
  let updatesFromBody = Object.keys(req.body)

  const isValidUpdate = updatesFromBody.every((update) =>
    allowedUpdates.includes(update)
  )

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
    res.status(200).send(director)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
