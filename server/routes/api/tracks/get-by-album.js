const spotifyAPI = require('../../../lib/apis/spotify')

module.exports = async (req, res, accessToken) => {
  const { albumId } = req.params
  const album = await spotifyAPI.getAlbum(albumId, accessToken)
  res.status(200).json({
    payload: album.tracks.items.map(item => ({ ...item, album }))
  })
}