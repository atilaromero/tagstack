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

async function doSources() {
  const url = "http://0.0.0.0:8080/sources"
  const res2 = await fetch(url)
  const data = res2.text()
  return data
}
app.use('/sources',
  // auth_middleware,
  (req, res) => {
    doSources()
      .then(data => {
        res.json({data})
      })
      .catch(error => {
        res.status(500).json({error})
      })
  }
)

app.use('/docs',
  // auth_middleware,
  (req, res) => {
    const url = "http://0.0.0.0:8080/docs"
    const r = request.post({uri: url, json: req.body})
    req.pipe(r).pipe(res)
  }
)

app.use('/search',
  // auth_middleware,
  (req, res) => {
    const url = "http://0.0.0.0:8080/search" + req.url
    const r = request(url)
    req.pipe(r).pipe(res)
  }
)

// async function doSearch(query) {
//   const url = "http://0.0.0.0:8080/search/item02-M170206?q=" + encodeURIComponent(query)
//   const res2 = await fetch(url)
//   const data = res2.text()
//   return data
// }
// app.use('/search',
//   // auth_middleware,
//   (req, res) => {
//     doSearch(req.query.q)
//       .then(data => {
//         setTimeout(function () {
//           res.json({data})
//         }, 1000);
//       })
//       .catch(error => {
//         res.status(500).json({error})
//       })
//   }
// )

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

// TODO: redirect http to https

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Server is running on port', port); //eslint-disable-line no-console
});
