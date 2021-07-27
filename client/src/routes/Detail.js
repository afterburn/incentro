import React from 'react'
import { useParams } from 'react-router-dom'

import { SpotifyContext } from '../context/Spotify'

const Detail = () => {
  const spotifyContext = React.useContext(SpotifyContext)
  const { dataType, id } = useParams()
  
  const data = spotifyContext.getResult(dataType, id)
  console.log(data)

  return <div>Detail</div>
}

export default Detail