import * as actionTypes from '../actions/actionTypes'
import { rgbToHex, schemesGenerator, updatedObject } from '../../lib/utilities'

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
  action.event.persist()
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

const getColor = (state, action) => {
  const { r, g, b, alpha } = action
  const schemes = schemesGenerator(r, g, b, state.schemeModel)
  const rgb = `rgb(${r}, ${g}, ${b})`,
    hex = rgbToHex(r, g, b)
  if (alpha !== 0 && state.picking) {
    return updatedObject(state, {
      rgbColors: { rgb, hex, r, g, b },
      schemes,
      alpha,
    })
  } else {
    return updatedObject(state, { alpha })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALUE_CONTROL:
      return valueControl(state, action)
    case actionTypes.GET_COLOR:
      return getColor(state, action)
    default:
      return state
  }
}

export default reducer
