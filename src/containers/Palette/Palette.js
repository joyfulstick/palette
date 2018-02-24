import React from 'react'
import HsvCylinder from '../../components/HsvCylider/HsvCylinder'
import ColorInfo from '../../components/ColorInfo/ColorInfo'
// import Swatches from '../Swatches/Swatches'
import { xy2polar, rad2deg, hsv2rgb } from '../../lib/utility'
import './Palette.css'

class Palette extends React.Component {
  state = {
    value: 1,
    radius: Math.round(window.innerWidth / 8),
    rgba: {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    },
    rgb: '',
    hex: '',
    // swatches: [],
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const ctx = this.canvas.getContext('2d')
    const drawCircle = () => {
      const { radius } = this.state
      const image = ctx.createImageData(2 * radius, 2 * radius)
      const { data } = image

      for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {
          const [r, phi] = xy2polar(x, y)

          if (r > radius) {
            continue
          }

          const deg = rad2deg(phi)

          const rowLength = 2 * radius
          const adjustedX = x + radius
          const adjustedY = y + radius
          const pixelWidth = 4
          const index = (adjustedX + adjustedY * rowLength) * pixelWidth

          const hue = deg
          const saturation = r / radius
          const { value } = this.state

          const [red, green, blue] = hsv2rgb(hue, saturation, value)
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
    if (data[3] !== 0)
      this.setState({
        rgba: { r: data[0], g: data[1], b: data[2] },
        rgb: `rgb(${data[0]}, ${data[1]}, ${data[2]})`,
        hex: `#${data[0].toString(16) +
          data[1].toString(16) +
          data[2].toString(16)}`,
      })
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
        <ColorInfo rgb={this.state.rgb} hex={this.state.hex} />
        {/* <Swatches /> */}
      </main>
    )
  }
}

export default Palette
