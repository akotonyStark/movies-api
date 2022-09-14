const express = require('express')
require('./db/Mongoose')
const cors = require('cors')
const directorRouter = require('./routes/directorRoutes')
const movieRouter = require('./routes/movieRoutes')

const app = express()

//allow all origins
app.use(cors())

//express middleware to parse all data to json
app.use(express.json())

app.use(directorRouter)
app.use(movieRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the Movies API')
})

app.listen('3001', () => {
  console.log(`listening on port 3001`)
})
