import React, { Component } from 'react'
import Palette from './components/Palette/Palette'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './store/reducers/reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

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
