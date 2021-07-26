import React from 'react'
import ReactDOM from 'react-dom'

import Input from './components/input'
import List from './components/list'

import { get } from './utils/fetch'

const App = () => {
  const [searchResult, setSearchResult] = React.useState(null)

  const handleSearch = val => {
    get(`/api/search/${val}`)
      .then(setSearchResult)
      .catch(err => console.log(err))
  }

  return <>
    <Input
      onChange={handleSearch}
      debounce={250}
    />
    {searchResult &&
      <>
        <List
          title='Albums'
          data={searchResult.albums}
        />
        <List
          title='Artists'
          data={searchResult.artists}
        />
        <List
          title='Tracks'
          data={searchResult.tracks}
        />
      </>
    }
    {!searchResult &&
      <p>Use the search field or text-to-speech button to search for albums, artists or tracks</p>
    }
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)