const express = require('express')
require('./db/Mongoose')

const directorRouter = require('./routes/directorRoutes')
const movieRouter = require('./routes/movieRoutes')
const app = express()
app.use(express.json())
app.use(directorRouter)
app.use(movieRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the Movies API')
})

app.listen('3001', () => {
  console.log(`listening on port 3001`)
})
