import React from 'react'
import HsvCylinder from '../../components/HsvCylider/HsvCylinder'
import ColorInfo from '../../components/ColorInfo/ColorInfo'
import Swatches from '../../components/Swatches/Swatches'
import Schemes from '../../components/Schemes/Schemes'
import {
  xyToPolar,
  radToDeg,
  hsvToRgb,
  rgbToHex,
  rgbStringToHex,
  schemesGenerator,
} from '../../lib/utility'
import './Palette.css'

class Palette extends React.Component {
  state = {
    value: 1,
    radius: 1,
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
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setRadius())
    this.setRadius()
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
          const { value } = this.state

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
    const schemes = schemesGenerator(r, g, b, this.state.schemeModel)
    const rgb = `rgb(${r}, ${g}, ${b})`,
      hex = rgbToHex(r, g, b)
    alpha !== 0 && this.state.picking
      ? this.setState({ rgbColors: { rgb, hex, r, g, b }, schemes, alpha })
      : this.setState({ alpha })
  }

  handleValueControl = e => {
    this.setState({
      value: e.target.value,
    })
  }

  handleSchemeChange = e => {
    const { r, g, b } = this.state.rgbColors
    const schemes = schemesGenerator(r, g, b, +e.target.value)
    this.setState({
      schemeModel: +e.target.value,
      schemes,
    })
  }

  handleCreateCss = () => {
    const swatches = this.swatches.children
    let values = []
    for (let i = 0; i < swatches.length; i++) {
      for (let j = 0; j < swatches[i].children.length; j++) {
        values.push(
          `--color${j}-tone${i}: ${rgbStringToHex(
            swatches[i].children[j].style.background,
          )}`,
        )
      }
    }
    const css = `:root&nbsp;{<br/>&nbsp;&nbsp;${values.join(
      ';<br/>&nbsp;&nbsp;',
    )};<br/>}`
    this.setState({ css })
    // console.log(`:root{\n  ${values.join(';\n  ')};\n}`) // eslint-disable-line
  }

  handlePick = () => {
    this.setState(prevState => {
      return { picking: !prevState.picking }
    })
    this.handleCreateCss()
  }

  handleSelect = e => {
    const code = document.createRange()
    code.setStartBefore(e.target)
    code.setEndAfter(e.target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(code)
    document.execCommand('Copy')
    alert('Code has been copied to clipboard :)')
  }

  render() {
    return (
      <main className="main">
        <HsvCylinder
          canvasRef={el => (this.canvas = el)}
          diameter={this.state.radius * 2}
          alpha={this.state.alpha}
          picking={this.state.picking}
          mouseMoved={e => this.handleGetColor(e)}
          chenged={e => this.handleValueControl(e)}
          clicked={this.handlePick}
        />
        <ColorInfo
          rgb={this.state.rgbColors.rgb}
          hex={this.state.rgbColors.hex}
        />
        <Schemes
          checked={this.state.schemeModel}
          chenged={e => this.handleSchemeChange(e)}
        />
        <Swatches
          schemes={this.state.schemes}
          swatchesRef={el => (this.swatches = el)}
        />
        {!this.state.picking && (
          <div className="css">
            <code
              className="css__code"
              dangerouslySetInnerHTML={{ __html: this.state.css }}
              onClick={e => this.handleSelect(e)}
            />
            <button className="css__button" onClick={this.handlePick}>
              Pick another color
            </button>
          </div>
        )}
      </main>
    )
  }
}

export default Palette
