const initialState = {
  value: 1,
  radius:
    window.innerWidth > window.innerHeight
      ? Math.round(window.innerWidth / 6)
      : Math.round(window.innerHeight / 6),
  rgbColors: {
    rgb: '',
    hex: '',
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
