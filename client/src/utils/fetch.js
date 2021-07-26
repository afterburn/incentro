export const get = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error)
        }
        resolve(res.payload)
      })
      .catch(reject)
  })
}

export const postJSON = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw new Error(res.error)
        }
        resolve(res.payload)
      })
      .catch(reject)
  })
}