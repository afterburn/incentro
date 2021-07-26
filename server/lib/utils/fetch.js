const request = require('request')

module.exports.get = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'GET',
      ...options
    }, (err, res, body) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(body))
    })
  })
}

module.exports.post = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'POST',
      ...options
    }, (err, res, body) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(body))
    })
  })
}