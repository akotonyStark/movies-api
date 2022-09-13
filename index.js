const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to the Movies API')
})

app.listen('3001', () => {
  console.log(`listening on port 3001`)
})
