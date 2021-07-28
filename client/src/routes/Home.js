import React from 'react'
import styled from 'styled-components'

import { FaMicrophone } from 'react-icons/fa'

import Input from '../components/Input'
import Button from '../components/Button'
import Carousel from '../components/Carousel'
import List from '../components/List'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'

import { SpotifyContext } from '../context/Spotify'

import TTS from '../utils/tts'

const Home = styled(({ className }) => {
  const spotifyContext = React.useContext(SpotifyContext)
  const inputRef = React.useRef()
  const [isRecording, setIsRecording] = React.useState(false)

  const [modalActive, setModalActive] = React.useState(false)
  const [modalError, setModalError] = React.useState(null)
  const [modalTitle, setModalTitle] = React.useState('')

  const handleSearch = query => {
    spotifyContext.search(query)
    spotifyContext.setQuery(query)
  }

  const handleTTS = async () => {
    setIsRecording(true)
    
    try {
      const query = await TTS.record()
      spotifyContext.search(query)
      inputRef.current.value = query
    } catch (ex) {
      console.log(ex)
      setModalTitle('Oops')
      setModalError(ex.message)
      setModalActive(true)
    }

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
        defaultValue={spotifyContext.query}
        debounce={500}
      />
      <Button onClick={handleTTS} color='warn' disabled={isRecording}>
        <FaMicrophone />
      </Button>
    </div>
    {spotifyContext.isSearching &&
      <div className='content no-results'>
        <Spinner />    
      </div>
    }
    {!spotifyContext.isSearching && spotifyContext.searchResult &&
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
    {!spotifyContext.isSearching && !spotifyContext.searchResult &&
      <div className='content no-results'>
        <p>No result(s) found.</p>
      </div>
    }
    <Modal active={modalActive} onClose={() => setModalActive(false)}>
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
        <Modal.Close />
      </Modal.Header>
      <Modal.Content>
        {modalError}
      </Modal.Content>
      <Modal.Footer>
        <Button color='cta' onClick={() => setModalActive(false)}>OK</Button>
      </Modal.Footer>
    </Modal>
  </div>
})`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .toolbar {
    display: flex;
    padding: 8px;

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