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
  action.payload.event.persist()
  const { value } = action.payload.event.target
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
  const { r, g, b, alpha } = action.payload
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

const togglePick = state => {
  return updatedObject(state, { picking: !state.picking })
}

const schemeChange = (state, action) => {
  action.payload.event.persist()
  const { r, g, b } = state.rgbColors
  const { value } = action.payload.event.target
  const schemes = schemesGenerator(r, g, b, +value)
  return updatedObject(state, {
    schemeModel: +value,
    schemes,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALUE_CONTROL:
      return valueControl(state, action)
    case actionTypes.GET_COLOR:
      return getColor(state, action)
    case actionTypes.TOGGLE_PICK:
      return togglePick(state)
    case actionTypes.SCHEME_CHANGE:
      return schemeChange(state, action)
    default:
      return state
  }
}

export default reducer
