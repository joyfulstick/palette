import * as actionTypes from './actionTypes'

export const inputValue = value => {
  return {
    type: actionTypes.INPUT_VALUE,
    payload: { value },
  }
}
