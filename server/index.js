const path = require('path')
const express = require('express')
const spotifyAPI = require('./lib/apis/spotify')
const cache = require('./lib/memcache')
const config = require('../config.json')

const dist = path.join(__dirname, '..', 'client', 'dist')

const searchRoute = require('./routes/api/search')
const getAlbumsByArtist = require('./routes/api/albums/get-by-artist')
const getTracksByAlbum = require('./routes/api/tracks/get-by-album')
const getTrack = require('./routes/api/tracks/get')
const getByType = require('./routes/api/get-by-type')

async function start () {
  try {
    const { access_token: accessToken } = await spotifyAPI.getAccessToken(config.client_id, config.client_secret)
    
    cache.set('albums', {})
    cache.set('artists', {})
    cache.set('tracks', {})

    const app = express()

    app.use(express.static(dist))

    app.get('/api/search/:query', (req, res) => searchRoute(req, res, accessToken))
    app.get('/api/albums/:artistId', (req, res) => getAlbumsByArtist(req, res, accessToken))
    app.get('/api/tracks/:albumId/all', (req, res) => getTracksByAlbum(req, res, accessToken))
    app.get('/api/tracks/:trackId', (req, res) => getTrack(req, res, accessToken))
    app.get('/api/:dataType/:id', (req, res) => getByType(req, res, accessToken))

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

start()