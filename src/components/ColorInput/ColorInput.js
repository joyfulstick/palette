import './ColorInput.css'
import * as actions from '../../store/actions'
import React, { Component } from 'react'
import { COLOR_PATTERN } from '../../constants/patterns'
import { connect } from 'react-redux'

export class ColorInput extends Component {
  state = {
    inputValue: '',
  }

  handleInput = e => {
    const { value } = e.target
    this.setState({ inputValue: value })
    this.props.onInputValue(value)
  }

  handleBlur = () => {
    this.setState({ inputValue: '' })
  }

  pattern = COLOR_PATTERN.toString().replace(/\//g, '')
  render() {
    return (
      <label className="color-input" htmlFor="color-input">
        <input
          className="color-input__element"
          type="text"
          name="color-input"
          placeholder="HEX or RGB"
          pattern={this.pattern}
          onChange={this.handleInput}
          value={this.state.inputValue}
          onBlur={this.handleBlur}
        />
        Color Input
      </label>
    )
  }
}

const mapStateToProps = state => {
  return {
    value: state.inputValue,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInputValue: value => dispatch(actions.inputValue(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorInput)
