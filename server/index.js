const path = require('path')
const express = require('express')
const request = require('request')

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({ payload: 'OK' })
})

app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})