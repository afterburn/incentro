
const { get, post } = require('../utils/fetch')

module.exports.getAccessToken = (clientId, clientSecret) => {
  return new Promise((resolve, reject) => {
    // Convert clientId & clientSecret to base64 string as per the Spotify API spec.
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    // Retrieve access token.
    post('https://accounts.spotify.com/api/token', {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'client_credentials'
      }
    })
      .then(resolve)
      .catch(reject)
  })
}

module.exports.search = (query, token) => {
  return new Promise((resolve, reject) => {
    get(`https://api.spotify.com/v1/search?q=${query}&type=album,artist,track`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(resolve)
      .catch(reject)
  })
}

module.exports.getByType = (dataType, id, token) => {
  return new Promise((resolve, reject) => {
    get(`https://api.spotify.com/v1/${dataType}s/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(resolve)
      .catch(reject)
  })
}

module.exports.getAlbum = (id, token) => {
  return new Promise((resolve, reject) => {
    get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(resolve)
      .catch(reject)
  })
}

module.exports.getArtist = (id, token) => {
  return new Promise((resolve, reject) => {
    get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(resolve)
      .catch(reject)
  })
}

module.exports.getArtistAlbums = (id, token) => {
  return new Promise((resolve, reject) => {
    get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(resolve)
      .catch(reject)
  })
}