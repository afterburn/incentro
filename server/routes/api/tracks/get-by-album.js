const cache = require('../../../lib/memcache')
const spotifyAPI = require('../../../lib/apis/spotify')

// Endpoint that obtains all tracks in an album using the album's id.
module.exports = async (req, res, accessToken) => {
  // In reality I would do some validation to make sure we're not dealing with a bad request.
  const { albumId } = req.params

  // Check if the album has been cached otherwise obtain via Spotify API.
  const cachedAlbums = cache.get('albums')
  if (cachedAlbums && cachedAlbums.hasOwnProperty(albumId)) {
    const cachedAlbum = cachedAlbums[albumId]

    // Check if the cached album has tracks loaded, if not we cannot use this cache item as
    // album.
    if (cachedAlbum.tracks) {
      return res.status(200).json({
        payload: cachedAlbum.tracks.items.map(item => ({ ...item, album: cachedAlbum }))
      })
    }
  }

  // Obtain album via Spotify API.
  const album = await spotifyAPI.getAlbum(albumId, accessToken)

  // Send response to client.
  res.status(200).json({
    payload: album.tracks.items.map(item => ({ ...item, album }))
  })
}