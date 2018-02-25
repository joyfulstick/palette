export const xy2Polar = (x, y) => {
  const r = Math.sqrt(x * x + y * y)
  const phi = Math.atan2(y, x)
  return [r, phi]
}

export const rad2Deg = rad => {
  return (rad + Math.PI) / (2 * Math.PI) * 360
}

export const hsv2Rgb = (hue, saturation, value) => {
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

export const rgb2Hsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let l = (max + min) / 2 * 100

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    s *= 100

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        h = 0
    }

    h /= 6
    h *= 360
  }

  return [h, s, l]
}

const primary2Hex = color => {
  var hex = color.toString(16)
  hex = hex.length === 1 ? '0' + hex : hex
  hex = hex.substring(1) === hex.substring(2) ? hex + hex : hex
  return hex
}

export const rgb2Hex = (r, g, b) => {
  return `#${primary2Hex(r) + primary2Hex(g) + primary2Hex(b)}`
}

export const schemeGenerator = (r, g, b, n) => {
  const [h, s, l] = rgb2Hsl(r, g, b)
  let scheme = []
  for (let i = 1; i <= 5; i++) {
    scheme[i - 1] = []
    for (let j = 0; j < n; j++) {
      scheme[i - 1][j] = `hsl(${(h - j * 360 / n).toFixed(0)}, ${s.toFixed(
        0,
      )}%, ${(l / i * 1.2).toFixed(0)}%)`
    }
  }
  return scheme
}
