import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Spinner from '../components/Spinner'
import Button from '../components/Button'
import Carousel from '../components/Carousel'
import List from '../components/List'

import { SpotifyContext } from '../context/Spotify'

import getImageUrl from '../utils/get-image-url'

const Detail = styled(({ className }) => {
  const params = useParams()
  const history = useHistory()
  const spotifyContext = React.useContext(SpotifyContext)
  const { dataType, id } = useParams()
  
  const [data, setData] = React.useState(null)
  const [albums, setAlbums] = React.useState([])
  const [tracks, setTracks] = React.useState([])
  const [track, setTrack] = React.useState(null)
  
  const loadData = async () => {
    const result = await spotifyContext.getResult(dataType, id)

    switch(dataType) {
      case 'artist': {
        const res = await spotifyContext.getAlbums(id)
        setAlbums(res)
        break
      }
      case 'album': {
        const res = await spotifyContext.getTracks(id)
        setTracks(res)
        break
      }
      case 'track': {
        const res = await spotifyContext.getTrack(result.album.id, id)
        setTrack(res)
        break
      }
    }
    
    setData(result)
  }

  const goBack = () => history.goBack()

  React.useEffect(() => {
    loadData()
  }, [params.dataType, params.id])

  if (!data) {
    return <div className={className}>
      <div className='loading'>
        <Spinner />
      </div>
    </div>
  }

  const name = data.name
  const externalUrl = data.external_urls.spotify
  const coverImage = data.type === 'album' || data.type === 'artist'
    ? getImageUrl(data.images)
    : getImageUrl(data.album.images)

  return <div className={className}>
    <div className='cover'>
      <div className='cover-background' />
      <div className='cover-content'>
        <div className='cover-image' style={{ backgroundImage: `url(${coverImage})` }}></div>
        <div className='info'>
          <h1>{name}</h1>
          <h2></h2>
        </div>
        <a href={externalUrl} target='_blank'>
          <Button variant='outlined' color='cta'>Open on Spotify</Button>
        </a>
      </div>
    </div>
    <div className='content'>
      <Button variant='outlined' onClick={goBack}>&larr; Go back</Button>
      {data.type === 'artist' &&
        <Carousel title='Albums' data={albums} />
      }
      {data.type === 'album' &&
        <List title='Tracks' data={tracks} />
      }
      {track && data.type === 'track' &&
        <>
          <Carousel title='Album' data={[track.album]} />
          <Carousel title='Artists' data={track.artists} />
        </>
      }
    </div>
  </div>
})`
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .cover {
    width: 100%;
    position: relative;

    .cover-background {
      width: 100%;
      height: 140px;
      background: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .75));
    }
  
    .cover-content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      padding: 0 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .cover-image {
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-right: 20px;
      }

      h1 {
        font-size: 2rem;
      }

      a {
        margin-left: auto;
      }
    }
  }
`

export default Detail