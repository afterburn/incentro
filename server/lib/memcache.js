class Memcache {
  constructor () {
    this.data = {}
  }

  set (key, value) {
    this.data[key] = value
  }

  get (key) {
    if (this.has(key)) {
      return this.data[key]
    }
    return null
  }

  has (key) {
    return this.data.hasOwnProperty(key)
  }
} 

module.exports = new Memcache()