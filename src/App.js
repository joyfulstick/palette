import React, { Component } from 'react'
import Palette from './components/Palette/Palette'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'

export const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Palette />
        </Provider>,
      </div>
    )
  }
}

export default App
