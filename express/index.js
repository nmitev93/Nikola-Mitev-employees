const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.EXPRESS_PORT || 3030

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send("Welcome to the Express server!")
})
