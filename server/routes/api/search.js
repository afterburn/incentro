const cache = require('../../lib/memcache')
const spotifyAPI = require('../../lib/apis/spotify')

module.exports = async (req, res, accessToken) => {
  const { query } = req.params

  const hasResultBeenCached = cache.has(query)
  const result = (!hasResultBeenCached)
    ? await spotifyAPI.search(query, accessToken)
    : cache.get(query)

  if (!hasResultBeenCached) {
    cache.set(query, result)

    const albums = mapResult(result.albums.items)
    const artists = mapResult(result.artists.items)
    const tracks = mapResult(result.tracks.items)

    cache.set('albums', albums)
    cache.set('artists', artists)
    cache.set('tracks', tracks)
  }

  res.status(200).json({
    payload: {
      albums: result.albums.items,
      artists: result.artists.items,
      tracks: result.tracks.items
    }
  })
}

function mapResult (arr) {
  const result = {}
  arr.forEach(item => {
    result[item.id] = item
  })
  return result
}