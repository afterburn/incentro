const cache = require('../../lib/memcache')
const spotifyAPI = require('../../lib/apis/spotify')

module.exports = async (req, res, accessToken) => {
  const { dataType, id } = req.params
  const cacheKey = `${dataType}s`

  const cachedData = cache.get(cacheKey)
  if (cachedData && cachedData.hasOwnProperty(id)) {
    return res.status(200).json({
      payload: cachedData[id]
    })
  }

  const data = await spotifyAPI.getByType(dataType, id, accessToken)
  cache.set(cacheKey, { ...cachedData, [id]: data })
  
  res.status(200).json({
    payload: data
  })
}