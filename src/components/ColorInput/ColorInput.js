import React from 'react'
import { COLOR_PATTERN } from '../../constants/patterns'
import './ColorInput.css'

const ColorInput = props => {
  const pattern = COLOR_PATTERN.toString().replace(/\//g, '')
  return (
    <label className="color-input" htmlFor="color-input">
      <input
        className="color-input__element"
        type="text"
        name="color-input"
        placeholder="HEX or RGB"
        pattern={pattern}
        onChange={props.chenged}
        value={props.value}
        onBlur={props.blured}
      />
    </label>
  )
}

export default ColorInput
