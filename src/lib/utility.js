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
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

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

export const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')

export const rgbStringToHex = rgb => {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i,
  )
  return rgb && rgb.length === 4
    ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : ''
}

export const arrayToRgbString = arr => `rgb(${arr.join(',')})`

export const hexToRgb = hex => {
  const rgba = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
      (m, r, g, b, a = 'f') => '#' + r + r + g + g + b + b + a + a,
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))

  const alpha = rgba.slice(-1)[0] / 255
  rgba.splice(3, 1, Math.round(alpha * 100) / 100)
  return rgba
}

export const schemesGenerator = (r, g, b, n) => {
  const [h, s, l] = rgbToHsl(r, g, b)
  let schemes = []
  if (s === 0) return schemes
  const nFloor = Math.floor(n)
  for (let i = 1; i <= 5; i++) {
    schemes[i - 1] = []
    for (let j = 0; j < nFloor; j++) {
      if (Number.isInteger(n)) {
        let hue = h - j * 360 / n
        if (hue < 0) hue += 360
        schemes[i - 1][j] = `hsl(${hue}, ${s}%, ${l / i}%)`
      } else {
        let hue = h - j * 300 * (n - nFloor)
        if (hue < 0) hue += 360
        schemes[i - 1][j] = `hsl(${hue}, ${s}%, ${l / i}%)`
      }
    }
  }
  return schemes
}
