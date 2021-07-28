
const { get, post } = require('../utils/fetch')

module.exports.getAccessToken = (clientId, clientSecret) => {
  return new Promise((resolve, reject) => {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
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

module.exports.searchByType = (dataType, id, token) => {
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

module.exports.getAlbumTracks = (id, token) => {
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

module.exports.getTrack = (id, token) => {
  return new Promise((resolve, reject) => {
    get(`https://api.spotify.com/v1/tracks/${id}`, {
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