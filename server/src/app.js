const express = require('express')
const app = express()
const port = 4000
app.use(express.json())
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
module.exports = app