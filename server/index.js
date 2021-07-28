// Imports.
const path = require('path')
const express = require('express')
const spotifyAPI = require('./lib/apis/spotify')
const cache = require('./lib/memcache')
const config = require('../config.json')

// Paths.
const dist = path.join(__dirname, '..', 'client', 'dist')

// Route imports.
const searchRoute = require('./routes/api/search')
const getAlbumsByArtist = require('./routes/api/albums/get-by-artist')
const getTracksByAlbum = require('./routes/api/tracks/get-by-album')
const getByType = require('./routes/api/get-by-type')

async function start () {
  try {
    // Obtain a Spotify API access token.
    const { access_token: accessToken } = await spotifyAPI.getAccessToken(config.client_id, config.client_secret)
    
    // Initialize cache.
    cache.set('albums', {})
    cache.set('artists', {})
    cache.set('tracks', {})

    // Setup an express server.
    const app = express()
    app.use(express.static(dist))

    // Register routes.
    app.get('/api/search/:query', (req, res) => searchRoute(req, res, accessToken))
    app.get('/api/albums/:artistId', (req, res) => getAlbumsByArtist(req, res, accessToken))
    app.get('/api/tracks/:albumId/all', (req, res) => getTracksByAlbum(req, res, accessToken))
    app.get('/api/:dataType/:id', (req, res) => getByType(req, res, accessToken))
    app.get('*', (req, res) => {
      res.status(200).sendFile(path.join(dist, 'index.html'))
    })

    // Start the express server.
    app.listen(3000, () => {
      console.log('listening on http://localhost:3000')
    })
  } catch(ex) {
    console.log(ex)
  }
}

// Start the app.
start()