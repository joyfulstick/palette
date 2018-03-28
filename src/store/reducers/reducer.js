import * as actionTypes from '../actions/actionTypes'
import {
  arrayToRgbString,
  hexToRgb,
  rgbStringToHex,
  rgbToHex,
  schemesGenerator,
  updatedObject,
} from '../../lib/utilities'

import { COLOR_PATTERN } from '../../constants/patterns'

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
}

const valueControl = (state, action) => {
  action.payload.event.persist()
  let { value } = action.payload.event.target
  value = +value
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

const inputValue = (state, action) => {
  const { value } = action.payload
  let rgbArr = [],
    rgb = '',
    hex = '',
    hsl = ''
  if (!COLOR_PATTERN.test(value)) {
    return updatedObject(state, { picking: true })
  } else if (value.match(/^r/)) {
    rgbArr = value
      .replace(/[^\d,]/g, '')
      .split(',')
      .map(x => +x)
    rgb = value
    hex = rgbStringToHex(value)
  } else if (value.match(/^#/)) {
    rgbArr = hexToRgb(value)
    rgb = arrayToRgbString(rgbArr)
    hex = value
  } else if (value.match(/^h/)) {
    hsl = value
  }
  const [r, g, b] = rgbArr
  const schemes = schemesGenerator(r, g, b, state.schemeModel)
  return updatedObject(state, {
    rgbColors: { rgb, hex, r, g, b },
    schemes,
    hsl,
    picking: false,
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
    case actionTypes.INPUT_VALUE:
      return inputValue(state, action)
    default:
      return state
  }
}

export default reducer
