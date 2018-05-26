const express = require('express')
const app = express()
const path = require('path')
const assert = require('assert')

const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const auth_middleware = require('./auth_middleware')(REACT_APP_CLIENT_ID)

assert(REACT_APP_CLIENT_ID, 'REACT_APP_CLIENT_ID not set')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

app.use('/tags',
  auth_middleware,
  (req, res) => {
    res.json({
      id: 1,
      tag: 'asdf',
      items: [
        { id: 1 },
        { id: 2 },
      ]
    })
  }
)

app.use('/data',
  auth_middleware,
  (req, res) => {
    res.json({
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25],
      ]
    })
  }
)

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Server is running on port', port); //eslint-disable-line no-console
});
