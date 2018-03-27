import * as actionTypes from './actionTypes'

export const schemeChange = event => {
  return {
    type: actionTypes.SCHEME_CHANGE,
    payload: { event },
  }
}
