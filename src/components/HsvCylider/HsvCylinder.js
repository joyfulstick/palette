import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HsvCylinder.css'
import {
  arrayToRgbString,
  hexToRgb,
  hsvToRgb,
  radToDeg,
  rgbToHex,
  rgbStringToHex,
  schemesGenerator,
  xyToPolar,
} from '../../lib/utilities'

class HsvCylinder extends Component {
  state = {
    radius:
      window.innerWidth > window.innerHeight
        ? Math.round(window.innerWidth / 6)
        : Math.round(window.innerHeight / 6),
  }
  componentDidMount() {
    window.addEventListener('resize', () => this.setRadius())
    // this.setRadius()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setRadius())
  }

  setRadius() {
    const radius =
      window.innerWidth > window.innerHeight
        ? Math.round(window.innerWidth / 6)
        : Math.round(window.innerHeight / 6)
    this.setState({ radius })
    this.updateCanvas()
  }

  updateCanvas() {
    const ctx = this.canvas.getContext('2d')
    if (ctx === null) return
    const drawCircle = () => {
      const { radius } = this.state
      const image = ctx.createImageData(2 * radius, 2 * radius)
      const { data } = image

      for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {
          const [r, phi] = xyToPolar(x, y)

          if (r > radius) continue

          const deg = radToDeg(phi)

          const rowLength = 2 * radius
          const adjustedX = x + radius
          const adjustedY = y + radius
          const pixelWidth = 4
          const index = (adjustedX + adjustedY * rowLength) * pixelWidth

          const hue = deg
          const saturation = r / radius
          const { value } = this.props

          const [red, green, blue] = hsvToRgb(hue, saturation, value)
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
    const [r, g, b, alpha] = [data[0], data[1], data[2], data[3]]
    const schemes = schemesGenerator(r, g, b, this.props.schemeModel)
    const rgb = `rgb(${r}, ${g}, ${b})`,
      hex = rgbToHex(r, g, b)
    alpha !== 0 && this.props.picking
      ? this.setState({ rgbColors: { rgb, hex, r, g, b }, schemes, alpha })
      : this.setState({ alpha })
  }

  handleValueControl = e => {
    const { value } = e.target
    const { r, g, b } = this.props.rgbColors
    const schemes = schemesGenerator(
      r * value,
      g * value,
      b * value,
      this.props.schemeModel,
    )
    this.setState({
      value,
      schemes,
    })
  }

  render() {
    return (
      <section className="hsv">
        <canvas
          className={
            this.props.alpha !== 0 && this.props.picking
              ? 'canvas--picking'
              : 'canvas--picked'
          }
          ref={el => (this.canvas = el)}
          width={this.state.radius * 2}
          height={this.state.radius * 2}
          onMouseMove={e => this.handleGetColor(e)}
          onClick={this.props.clicked}
        />
        {!this.props.picking && <em className="color--picked">Picked!</em>}
        <form
          className="range--value"
          style={{ width: this.state.radius * 2 / 3 }}
        >
          <input
            className="range--value__input"
            type="range"
            min="0"
            max="1"
            step=".01"
            onChange={e => this.handleValueControl(e)}
          />
        </form>
      </section>
    )
  }
}

const mapStateToProps = state => {
  const { value, schemeModel, picking, alpha } = state
  return {
    value,
    schemeModel,
    picking,
    alpha,
  }
}

export default connect(mapStateToProps)(HsvCylinder)
