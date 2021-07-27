import React from 'react'

import { get } from '../utils/fetch'

export const SpotifyContext = React.createContext({})

export const Provider = ({ children }) => {
  const [albums, setAlbums] = React.useState({})
  const [artists, setArtists] = React.useState({})
  const [tracks, setTracks] = React.useState({})
  const [searchResult, setSearchResult] = React.useState(null)

  const results = {
    'album': albums,
    'artist': artists,
    'track': tracks,
  }

  const search = (query) => {
    if (query === '') {
      setSearchResult(null)
      return
    }

    get(`/api/search/${query}`)
      .then(res => {
        setSearchResult(res)

        const newAlbums = {}
        res.albums.forEach(album => newAlbums[album.id] = album)

        setAlbums({ ...albums, ...newAlbums })
      })
      .catch(console.log)

  }

  const getResult = (dataType, id) => {
    if (results[dataType].hasOwnProperty(id)) {
      return results[dataType][id]
    }

    get(`/api/${dataType}/${id}`)
      .then(res => {
        console.log(res)
      })
      .catch(console.log)
  }

  const context = {
    setAlbums,
    setArtists,
    setTracks,
    getResult,
    searchResult,
    search
  }

  return <SpotifyContext.Provider value={context}>
    {children}
  </SpotifyContext.Provider>
}
