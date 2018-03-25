import * as actionTypes from './actionTypes'

export const valueControl = event => {
  return {
    type: actionTypes.VALUE_CONTROL,
    event,
  }
}
