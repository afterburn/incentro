const cache = require('../../lib/memcache')
const spotifyAPI = require('../../lib/apis/spotify')

// Endpoint used for obtaining an album, artist or track.
module.exports = async (req, res, accessToken) => {
  // In reality I would do some validation to make sure we're not dealing with a bad request.
  const { dataType, id } = req.params

  // Since Spotify data types are singular we have to make them plural.
  const cacheKey = `${dataType}s`

  // Check whether the cacheKey and id are present within the cache, if that is the case
  // we send the cached item to the client and exit early.
  const cachedData = cache.get(cacheKey)
  if (cachedData && cachedData.hasOwnProperty(id)) {
    return res.status(200).json({
      payload: cachedData[id]
    })
  }

  // Otherwise, we use the Spotify API to obtain the data.
  const data = await spotifyAPI.getByType(dataType, id, accessToken)

  switch (dataType) {
    case 'track': {
      // When obtaining a track, the Spotify API does not include all artist data, so we check
      // if we can load artist(s) from cache, otherwise we need to load them from the Spotify API
      // N+1 problem.
      data.artists = await Promise.all(data.artists.map(artist => {
        const artists = cache.get('artists')
        if (artists.hasOwnProperty(artist.id)) {
          return new Promise(resolve => resolve(artists[artist.id]))
        }
        return spotifyAPI.getArtist(artist.id, accessToken)
      }))
      break
    }
  }

  // Update the cache with the newly obtained data.
  cache.set(cacheKey, { ...cachedData, [id]: data })
  
  // Send response to client.
  res.status(200).json({
    payload: data
  })
}