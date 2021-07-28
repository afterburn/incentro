const cache = require('../../../lib/memcache')
const spotifyAPI = require('../../../lib/apis/spotify')

module.exports = async (req, res, accessToken) => {
  const { trackId } = req.params

  const cachedTracks = cache.get('tracks')
  if (cachedTracks && cachedTracks.hasOwnProperty(trackId)) {
    const track = cachedTracks[trackId]
    track.artists = await Promise.all(track.artists.map(artist => spotifyAPI.getArtist(artist.id, accessToken)))
    return res.status(200).json({
      payload: track
    })
  }

  const track = await spotifyAPI.getTrack(trackId, accessToken)
  track.artists = await Promise.all(track.artists.map(artist => spotifyAPI.getArtist(artist.id, accessToken)))
  
  res.status(200).json({
    payload: track
  })
}