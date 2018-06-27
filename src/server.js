const express = require('express')
const app = express()
const path = require('path')
const assert = require('assert')
const fetch = require('node-fetch')
const request = require('request')

const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const auth_middleware = require('./auth_middleware')(REACT_APP_CLIENT_ID)

assert(REACT_APP_CLIENT_ID, 'REACT_APP_CLIENT_ID not set')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

app.use('/sources',
  // auth_middleware,
  (req, res) => {
    const url = "https://raw.githubusercontent.com/atilaromero/tagstack/datasets/sources/vd.json"
    const r = request(url)
    req.pipe(r).pipe(res)
  }
)

// TODO: redirect http to https

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Server is running on port', port); //eslint-disable-line no-console
});
