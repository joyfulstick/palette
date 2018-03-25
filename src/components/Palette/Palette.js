import './Palette.css'
import {
  arrayToRgbString,
  hexToRgb,
  rgbStringToHex,
  schemesGenerator,
} from '../../lib/utilities'
import { COLOR_PATTERN } from '../../constants/patterns'
import ColorInfo from '../ColorInfo/ColorInfo'
import ColorInput from '../ColorInput/ColorInput'
import CssCode from '../CssCode/CssCode'
import HsvCylinder from '../HsvCylider/HsvCylinder'
import React from 'react'
import Schemes from '../Schemes/Schemes'
import Swatches from '../Swatches/Swatches'
import { connect } from 'react-redux'

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
    inputValue: '',
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
          `--color${j}-shade${i}: ${rgbStringToHex(
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
  }

  handleSelect = e => {
    const code = document.createRange()
    code.setStartBefore(e.target)
    code.setEndAfter(e.target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(code)
    document.execCommand('Copy')
    alert('Code has been copied to your clipboard ┻━┻ ︵¯\\(ツ)/¯︵ ┻━┻')
  }

  handleInput = e => {
    const { value } = e.target
    this.setState({ inputValue: value })
    let rgbArr = [],
      rgb = '',
      hex = ''
    if (!COLOR_PATTERN.test(value)) {
      this.setState({ picking: true })
      return
    } else if (value.match(/^r/)) {
      rgbArr = value
        .replace(/[^\d,]/g, '')
        .split(',')
        .map(x => +x)
      rgb = value
      hex = rgbStringToHex(value)
    } else if (value.match(/^#/)) {
      rgbArr = hexToRgb(value)
      rgb = arrayToRgbString(rgbArr)
      hex = value
    } else if (value.match(/^h/)) {
      this.setState({ hsl: value })
    }
    const [r, g, b] = rgbArr
    const schemes = schemesGenerator(r, g, b, this.state.schemeModel)
    this.setState({ rgbColors: { rgb, hex, r, g, b }, schemes, picking: false })
  }

  handleBlur = () => {
    this.setState({ inputValue: '' })
  }

  render() {
    return (
      <main className="main">
        <HsvCylinder clicked={this.handlePick} />
        <ColorInfo
          rgb={this.state.rgbColors.rgb}
          hex={this.state.rgbColors.hex}
          picking={this.state.picking}
          clicked={this.handlePick}
        />
        <Schemes
          checked={this.state.schemeModel}
          chenged={e => this.handleSchemeChange(e)}
        />
        <Swatches
          schemes={this.state.schemes}
          swatchesRef={el => (this.swatches = el)}
        />

        <CssCode
          innerHTML={{ __html: this.state.css }}
          schemes={this.state.schemes}
          css={this.state.css}
          clickedCreator={this.handleCreateCss}
          clicked={e => this.handleSelect(e)}
          clickExit={() => this.setState({ css: '' })}
        />
        <ColorInput
          chenged={this.handleInput}
          value={this.state.inputValue}
          blured={this.handleBlur}
        />
      </main>
    )
  }
}

// const mapStateToProps = state => {
//   return {}
// }

export default connect(null, null)(Palette)
