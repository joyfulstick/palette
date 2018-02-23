import React from 'react'

class Hsv extends React.Component {
  state = { rgba: '', value: 1 }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const ctx = this.canvas.getContext('2d')
    const drawCircle = () => {
      const radius = 150
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

    const xy2polar = (x, y) => {
      const r = Math.sqrt(x * x + y * y)
      const phi = Math.atan2(y, x)
      return [r, phi]
    }

    const rad2deg = rad => {
      return (rad + Math.PI) / (2 * Math.PI) * 360
    }

    const hsv2rgb = (hue, saturation, value) => {
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
    const rgba = `rgb(${data[0]}, ${data[1]}, ${data[2]})`
    if (data[3] !== 0) this.setState({ rgba })
  }

  changeValue = e => {
    this.setState({
      value: e.target.value,
    })
  }

  handleValueControl = e => {
    this.changeValue(e)
  }

  render() {
    return (
      <section
        style={{
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: '1vw repeat(5, 1fr) 1vw',
          gridTemplateRows: '10vh repeat(2, 1fr)',
        }}>
        <canvas
          style={{ gridArea: '2/4' }}
          ref={el => (this.canvas = el)}
          width={300}
          height={300}
          onMouseMove={e => this.handleGetColor(e)}
        />
        <label
          style={{
            gridArea: '2/5',
            alignSelf: 'center',
            transform: 'rotate(-90deg)',
            background: `linear-gradient(-90deg, #fff, #000)`,
          }}>
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            onChange={e => this.handleValueControl(e)}
          />
        </label>
        <p style={{ gridArea: '3/4' }}>
          {this.state.rgba}
          <span
            style={{
              marginLeft: '1em',
              background: this.state.rgba,
              color: this.state.rgba,
            }}>
            HSV
          </span>
        </p>
      </section>
    )
  }
}

export default Hsv
