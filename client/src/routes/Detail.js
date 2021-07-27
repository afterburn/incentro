import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Spinner from '../components/Spinner'
import Button from '../components/Button'

import { SpotifyContext } from '../context/Spotify'

import getImageUrl from '../utils/get-image-url'

const Detail = styled(({ className }) => {
  const spotifyContext = React.useContext(SpotifyContext)
  const { dataType, id } = useParams()
  
  const [data, setData] = React.useState(null)
  
  const loadData = async () => {
    const result = await spotifyContext.getResult(dataType, id)
    setData(result)
  }

  React.useEffect(() => {
    loadData()
  }, [])

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
      <Link to='/'>
        <Button variant='outlined'>&larr; Go back</Button>
      </Link>
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

  .content {
    padding: 20px;
  }
`

export default Detail