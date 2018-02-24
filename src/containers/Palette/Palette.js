import React from 'react'
import HsvCylinder from '../../components/HsvCylider/HsvCylinder'
import ColorInfo from '../../components/ColorInfo/ColorInfo'
// import Swatches from '../Swatches/Swatches'
import { xy2Polar, rad2Deg, hsv2Rgb, rgb2Hsl, rgb2Hex } from '../../lib/utility'
import './Palette.css'

class Palette extends React.Component {
  state = {
    value: 1,
    radius: window.innerWidth > window.innerHeight
    ? Math.round(window.innerWidth / 6)
    : Math.round(window.innerHeight / 6),
    colors: {
      rgb: '',
      hex: '',
      hsl: '',
    },
    // swatches: [],
  }

  componentDidMount() {
    this.updateCanvas()
    window.addEventListener('resize', () => this.setRadius())  
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setRadius())
  }

  setRadius() {
    const radius = window.innerWidth > window.innerHeight
    ? Math.round(window.innerWidth / 6)
    : Math.round(window.innerHeight / 6)
    this.setState({radius})
  }

  updateCanvas() {
    const ctx = this.canvas.getContext('2d')
    const drawCircle = () => {
      const { radius } = this.state
      const image = ctx.createImageData(2 * radius, 2 * radius)
      const { data } = image

      for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {
          const [r, phi] = xy2Polar(x, y)

          if (r > radius) {
            continue
          }

          const deg = rad2Deg(phi)

          const rowLength = 2 * radius
          const adjustedX = x + radius
          const adjustedY = y + radius
          const pixelWidth = 4
          const index = (adjustedX + adjustedY * rowLength) * pixelWidth

          const hue = deg
          const saturation = r / radius
          const { value } = this.state

          const [red, green, blue] = hsv2Rgb(hue, saturation, value)
          const alpha = 255

          data[index] = red
          data[index + 1] = green
          data[index + 2] = blue
          data[index + 3] = alpha
        }
      }

      ctx.putImageData(image, 0, 0)
    }

    drawCircle()
  }

  handleGetColor(event) {
    const { canvas } = this
    const ctx = canvas.getContext('2d')
    const bound = canvas.getBoundingClientRect()
    const x = event.clientX - bound.x
    const y = event.clientY - bound.y
    const pixel = ctx.getImageData(x, y, 1, 1)
    const { data } = pixel
    const [r, g, b] = [data[0], data[1], data[2]]
    const [h, s, l] = rgb2Hsl(r, g, b)
    const rgb = `rgb(${r}, ${g}, ${b})`,
      hex = rgb2Hex(r, g, b),
      hsl = `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`
    if (data[3] !== 0) {
      this.setState({ colors: { rgb, hex, hsl } })
    }
  }

  handleValueControl = e => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <main className="main">
        <HsvCylinder
          canvasRef={el => (this.canvas = el)}
          diameter={this.state.radius * 2}
          mouseMoved={e => this.handleGetColor(e)}
          chenged={e => this.handleValueControl(e)}
        />
        <ColorInfo
          rgb={this.state.colors.rgb}
          hex={this.state.colors.hex}
          hsl={this.state.colors.hsl}
        />
        {/* <Swatches /> */}
      </main>
    )
  }
}

export default Palette
