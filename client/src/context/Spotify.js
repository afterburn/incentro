import React from 'react'

import { get } from '../utils/fetch'
import arrayToObject from '../utils/array-to-object'

export const SpotifyContext = React.createContext({})

export const Provider = ({ children }) => {
  const [albums, setAlbums] = React.useState({})
  const [artists, setArtists] = React.useState({})
  const [tracks, setTracks] = React.useState({})
  const [queries, setQueries] = React.useState({})
  const [query, setQuery] = React.useState('')
  const [searchResult, setSearchResult] = React.useState(null)
  const [isSearching, setIsSearching] = React.useState(false)

  const results = {
    'album': albums,
    'artist': artists,
    'track': tracks,
    'queries': queries
  }

  const search = (query) => {
    if (query === '') {
      setSearchResult(null)
      return
    }

    setIsSearching(true)

    if (queries.hasOwnProperty(query)) {
      const res = queries[query]
      setSearchResult(res)
      setIsSearching(false)
      console.log('results loaded from client cache')
      return
    }

    get(`/api/search/${query}`)
      .then(res => {
        setSearchResult(res)
        console.log('results loaded from api')

        const newAlbums = arrayToObject(res.albums, 'id')
        const newArtists = arrayToObject(res.artists, 'id')
        const newTracks = arrayToObject(res.tracks, 'id')
        const newQueries = {...queries, [query]: res }

        setAlbums({ ...albums, ...newAlbums })
        setArtists({ ...artists, ...newArtists })
        setTracks({ ...tracks, ...newTracks })
        setQueries({ ...queries, ...newQueries })
      })
      .catch(console.log)
      .finally(() => {
        setIsSearching(false)
      })
  }

  const getResult = (dataType, id) => {
    return new Promise((resolve, reject) => {
      if (results[dataType].hasOwnProperty(id)) {
        return resolve(results[dataType][id])
      }
      
      get(`/api/${dataType}/${id}`)
        .then(resolve)
        .catch(reject)
    })
  }

  const getAlbums = (artistId) => {
    return new Promise((resolve, reject) => {
      get(`/api/albums/${artistId}`)
        .then(resolve)
        .catch(console.log)
    })
  }

  const getTracks = (albumId) => {
    return new Promise((resolve, reject) => {
      get(`/api/tracks/${albumId}/all`)
        .then(resolve)
        .catch(console.log)
    })
  }

  const getTrack = (trackId) => {
    return new Promise((resolve, reject) => {
      get(`/api/tracks/${trackId}`)
        .then(resolve)
        .catch(console.log)
    })
  }

  const context = {
    setAlbums,
    setArtists,
    setTracks,
    getResult,
    searchResult,
    search,
    isSearching,
    query,
    setQuery,
    getAlbums,
    getTracks,
    getTrack
  }

  return <SpotifyContext.Provider value={context}>
    {children}
  </SpotifyContext.Provider>
}
