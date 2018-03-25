import * as actionTypes from '../actions/actionTypes'
import { schemesGenerator, updatedObject } from '../../lib/utilities'

const initialState = {
  value: 1,
  rgbColors: {
    rgb: '',
    hex: '',
    r: 0,
    b: 0,
    g: 0,
  },
  hsl: '',
  alpha: 0,
  schemeModel: 1,
  schemes: [],
  picking: true,
  css: '',
  inputValue: '',
}

const valueControl = (state, action) => {
  const { value } = action.event.target
  const { r, g, b } = state.rgbColors
  const schemes = schemesGenerator(
    r * value,
    g * value,
    b * value,
    state.schemeModel,
  )
  return updatedObject(state, { value, schemes })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALUE_CONTROL:
      return valueControl(state, action)
    default:
      state
  }
  return state
}

export default reducer
