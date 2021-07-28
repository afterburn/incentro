const spotifyAPI = require('../../../lib/apis/spotify')

// Endpoints used for obtaining albums by artist id.
module.exports = async (req, res, accessToken) => {
  // In reality I would do some validation to make sure we're not dealing with a bad request.
  const { artistId } = req.params

  // TODO: Add caching.

  // Obtain albums via Spotify API.
  const albums = await spotifyAPI.getArtistAlbums(artistId, accessToken)

  // Send response to client.
  res.status(200).json({
    payload: albums.items
  })
}