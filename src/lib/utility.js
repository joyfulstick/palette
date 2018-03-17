export const xyToPolar = (x, y) => {
  const r = Math.sqrt(x * x + y * y)
  const phi = Math.atan2(y, x)
  return [r, phi]
}

export const radToDeg = rad => {
  return (rad + Math.PI) / (2 * Math.PI) * 360
}

export const hsvToRgb = (hue, saturation, value) => {
  const chroma = value * saturation
  const hue1 = hue / 60
  const x = chroma * (1 - Math.abs(hue1 % 2 - 1))
  let r1, g1, b1
  if (hue1 >= 0 && hue1 <= 1) {
    [r1, g1, b1] = [chroma, x, 0]
  } else if (hue1 >= 1 && hue1 <= 2) {
    [r1, g1, b1] = [x, chroma, 0]
  } else if (hue1 >= 2 && hue1 <= 3) {
    [r1, g1, b1] = [0, chroma, x]
  } else if (hue1 >= 3 && hue1 <= 4) {
    [r1, g1, b1] = [0, x, chroma]
  } else if (hue1 >= 4 && hue1 <= 5) {
    [r1, g1, b1] = [x, 0, chroma]
  } else if (hue1 >= 5 && hue1 <= 6) {
    [r1, g1, b1] = [chroma, 0, x]
  }

  let m = value - chroma
  let [r, g, b] = [r1 + m, g1 + m, b1 + m]

  return [255 * r, 255 * g, 255 * b]
}

export const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const diff = max - min
    s = l > .5 ? diff / (2 - max - min) : diff / (max + min)

    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
      default:
        h = 0
    }
    h *= 60
    s *= 100
    l *= 100
  }

  return [h, s, l]
}

const primaryToHex = color => {
  var hex = color.toString(16)
  hex = hex.length === 1 ? '0' + hex : hex
  hex = hex.substring(1) === hex.substring(2) ? hex + hex : hex
  return hex
}

export const rgbToHex = (r, g, b) => {
  return `#${primaryToHex(r) + primaryToHex(g) + primaryToHex(b)}`
}

export const schemesGenerator = (r, g, b, n) => {
  const [h, s, l] = rgbToHsl(r, g, b)
  let schemes = []
  for (let i = 1; i <= 5; i++) {
    schemes[i - 1] = []
    for (let j = 0; j < n; j++) {
      schemes[i - 1][j] = `hsl(${h - j * 360 / n}, ${s}%, ${l / i}%)`
    }
  }
  return schemes
}
