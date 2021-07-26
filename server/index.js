const path = require('path')
const express = require('express')
const spotifyAPI = require('./lib/apis/spotify')
const memcache = require('./lib/memcache')

const config = require('../config.json')

const dist = path.join(__dirname, '..', 'client', 'dist')

async function start () {
  try {
    const { access_token: accessToken } = await spotifyAPI.getAccessToken(config.client_id, config.client_secret)
    
    const app = express()

    app.use(express.static(dist))

    app.get('/', (req, res) => {
      res.status(200).sendFile(path.join(dist, 'index.html'))
    })

    app.get('/api/search/:query', async (req, res) => {
      const { query } = req.params

      const hasResultBeenCached = memcache.has(query)
      const result = (!hasResultBeenCached)
        ? await spotifyAPI.search(query, accessToken)
        : memcache.get(query)

      if (!hasResultBeenCached) {
        memcache.set(query, result)
      }

      res.status(200).json({
        payload: {
          albums: result.albums.items,
          artists: result.artists.items,
          tracks: result.tracks.items
        }
      })
    })

    app.listen(3000, () => {
      console.log('listening on http://localhost:3000')
    })
  } catch(ex) {
    console.log(ex)
  }
}

start()