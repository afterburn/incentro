const cache = require('../../lib/memcache')
const spotifyAPI = require('../../lib/apis/spotify')

// Search endpoint.
module.exports = async (req, res, accessToken) => {
  // In reality I would do some validation to make sure we're not dealing with a bad request.
  const { query } = req.params

  // Check if the query is present within the cache. If not, we retrieve via spotify api.
  const hasResultBeenCached = cache.has(query)
  const result = (!hasResultBeenCached)
    ? await spotifyAPI.search(query, accessToken)
    : cache.get(query)

  // If the query was not present within the cache, we update the cache with the data
  // we've obtained through the spotify api.
  if (!hasResultBeenCached) {
    cache.set(query, result)

    const albums = mapResult(result.albums.items)
    const artists = mapResult(result.artists.items)
    const tracks = mapResult(result.tracks.items)

    cache.set('albums', albums)
    cache.set('artists', artists)
    cache.set('tracks', tracks)
  }

  // We send the result to the client.
  res.status(200).json({
    payload: {
      albums: result.albums.items,
      artists: result.artists.items,
      tracks: result.tracks.items
    }
  })
}

// Helper function that maps an array onto an object using 'id' as the key.
function mapResult (arr) {
  const result = {}
  arr.forEach(item => {
    result[item.id] = item
  })
  return result
}