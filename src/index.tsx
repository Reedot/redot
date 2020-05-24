import { hydrate } from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import { Provider } from 'react-redux'

import configureStore from './store'
import App from './App'

const store = configureStore()

loadableReady(() => {
  const rootElement = document.getElementById('root')
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <>
          <App />
        </>
      </BrowserRouter>
    </Provider>,
    rootElement
  )
})

if (module.hot) {
  module.hot.accept()
}