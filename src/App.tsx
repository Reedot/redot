import React from 'react'
import { Route, Switch } from 'react-router'
import { Helmet } from 'react-helmet'
import loadable from '@loadable/component'

const Header = loadable(() => import(/* webpackChunkName: "Header" */ './components/Header'))
const Footer = loadable(() => import(/* webpackChunkName: "Footer" */ './components/Footer'))
const Home = loadable(() => import(/* webpackChunkName: "Home" */ './pages/Home'))
const News = loadable(() => import(/* webpackChunkName: "News" */ './pages/News'))

const App: React.FC = () => {
  return <div>
    <Helmet>
      <title>App</title>
    </Helmet>
    <Route path="/" render={() => <Header />} />
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/news" render={() => <News />} />
    </Switch>
    <Footer />
  </div>

}

export default App