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

const reducer = (state = initialState, action) => {
  // switch (action.type) {
  //   case '':
  //     return
  //   default:
  //     state
  // }
  return state
}

export default reducer
