import React from 'react'
import styled from 'styled-components'

import { FaMicrophone } from 'react-icons/fa'

import Input from '../components/Input'
import Button from '../components/Button'
import Carousel from '../components/Carousel'
import List from '../components/List'

import { SpotifyContext } from '../context/Spotify'

import TTS from '../utils/tts'
import { get } from '../utils/fetch'

const Home = styled(({ className }) => {
  const spotifyContext = React.useContext(SpotifyContext)
  const inputRef = React.useRef()
  const [isRecording, setIsRecording] = React.useState(false)

  const handleSearch = query => {
    spotifyContext.search(query)
  }

  const handleTTS = async () => {
    setIsRecording(true)
    
    const query = await TTS.record()
    spotifyContext.search(query)
    inputRef.current.value = query

    setIsRecording(false)
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef.current])

  return <div className={className}>
    <div className='toolbar'>
      <Input
        forwardRef={inputRef}
        onChange={handleSearch}
        placeholder='Search for albums, artists or tracks...'
        debounce={250}
      />
      <Button onClick={handleTTS} color='warn' disabled={isRecording}>
        <FaMicrophone />
      </Button>
    </div>
    {spotifyContext.searchResult &&
      <div className='content'>
        <Carousel
          title='Albums'
          data={spotifyContext.searchResult.albums}
        />
        <Carousel
          title='Artists'
          data={spotifyContext.searchResult.artists}
        />
        <List
          title='Tracks'
          data={spotifyContext.searchResult.tracks}
        />
      </div>
    }
    {!spotifyContext.searchResult &&
      <div className='content no-results'>
        <p>No result(s) found.</p>
      </div>
    }
  </div>
})`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .toolbar {
    display: flex;
    padding: 20px;

    button {
      margin-left: 8px;
      width: 35px;
    }
  }

  .content {
    &.no-results {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      flex: 1;
    }
  }
`

export default Home