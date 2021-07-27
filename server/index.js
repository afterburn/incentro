const path = require('path')
const express = require('express')
const spotifyAPI = require('./lib/apis/spotify')
const memcache = require('./lib/memcache')

const config = require('../config.json')

const dist = path.join(__dirname, '..', 'client', 'dist')

async function start () {
  try {
    const { access_token: accessToken } = await spotifyAPI.getAccessToken(config.client_id, config.client_secret)
    
    memcache.set('albums', {})
    memcache.set('artists', {})
    memcache.set('tracks', {})

    const app = express()

    app.use(express.static(dist))

    app.get('/api/search/:query', async (req, res) => {
      const { query } = req.params

      const hasResultBeenCached = memcache.has(query)
      const result = (!hasResultBeenCached)
        ? await spotifyAPI.search(query, accessToken)
        : memcache.get(query)

      if (!hasResultBeenCached) {
        memcache.set(query, result)

        const albums = mapResult(result.albums.items)
        const artists = mapResult(result.artists.items)
        const tracks = mapResult(result.tracks.items)

        memcache.set('albums', albums)
        memcache.set('artists', artists)
        memcache.set('tracks', tracks)
      }

      res.status(200).json({
        payload: {
          albums: result.albums.items,
          artists: result.artists.items,
          tracks: result.tracks.items
        }
      })
    })

    app.get('/api/:dataType/:id', async (req, res) => {
      const { dataType, id } = req.params
      const cacheKey = `${dataType}s`

      const cachedData = memcache.get(cacheKey)
      if (cachedData && cachedData.hasOwnProperty(id)) {
        return res.status(200).json({
          payload: cachedData[id]
        })
      }

      const data = await spotifyAPI.searchByType(dataType, id, accessToken)
      memcache.set(cacheKey, { ...cachedData, [id]: data })
      
      res.status(200).json({
        payload: data
      })
    })

    app.get('*', (req, res) => {
      res.status(200).sendFile(path.join(dist, 'index.html'))
    })

    app.listen(3000, () => {
      console.log('listening on http://localhost:3000')
    })
  } catch(ex) {
    console.log(ex)
  }
}

function mapResult (arr) {
  const result = {}
  arr.forEach(item => {
    result[item.id] = item
  })
  return result
}

start()