import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider as SpotifyProvider } from './context/Spotify'

import Fallback from './components/Fallback'

import GlobalStyle from './style'

const HomeRoute = React.lazy(() => import('./routes/Home'))
const DetailRoute = React.lazy(() => import('./routes/Detail'))

const App = () => {
  return <SpotifyProvider>
    <GlobalStyle />
    <Router>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route exact path='/' component={HomeRoute} />
          <Route path='/:dataType/:id' component={DetailRoute} />
        </Switch>
      </Suspense>
    </Router>
  </SpotifyProvider>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)