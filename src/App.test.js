import App from './App'
import Palette from './components/Palette/Palette'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import ShallowRenderer from 'react-test-renderer/shallow'
import { createStore } from 'redux'
import reducer from './store/reducers/reducer'
import renderer from 'react-test-renderer'

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div,
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders shallowly', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<App />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe('div')
    expect(result.props.children).toEqual(<Palette />)
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
