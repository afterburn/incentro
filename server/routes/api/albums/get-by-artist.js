const spotifyAPI = require('../../../lib/apis/spotify')

module.exports = async (req, res, accessToken) => {
  const { artistId } = req.params
  const albums = await spotifyAPI.getArtistAlbums(artistId, accessToken)
  res.status(200).json({
    payload: albums.items
  })
}