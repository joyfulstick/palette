import './Palette.css'
import ColorInfo from '../ColorInfo/ColorInfo'
import ColorInput from '../ColorInput/ColorInput'
import CssCode from '../CssCode/CssCode'
import HsvCylinder from '../HsvCylider/HsvCylinder'
import React from 'react'
import Schemes from '../Schemes/Schemes'
import Swatches from '../Swatches/Swatches'
import { rgbStringToHex } from '../../lib/utilities'

class Palette extends React.Component {
  state = {
    css: '',
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

  render() {
    return (
      <main className="main">
        <HsvCylinder />
        <ColorInfo />
        <Schemes />
        <Swatches
          swatchesRef={el => (this.swatches = el)}
          clickedCreator={this.handleCreateCss}
        />
        <CssCode
          innerHTML={{ __html: this.state.css }}
          css={this.state.css}
          clickedCreator={this.handleCreateCss}
          clicked={e => this.handleSelect(e)}
          clickExit={() => this.setState({ css: '' })}
        />
        <ColorInput />
      </main>
    )
  }
}

export default Palette
