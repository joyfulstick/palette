import * as actionTypes from './actionTypes'

export const valueControl = event => {
  return {
    type: actionTypes.VALUE_CONTROL,
    payload: { event },
  }
}

export const getColor = (r, g, b, alpha) => {
  return {
    type: actionTypes.GET_COLOR,
    payload: {
      r,
      g,
      b,
      alpha,
    },
  }
}

export const togglePick = () => {
  return {
    type: actionTypes.TOGGLE_PICK,
  }
}
