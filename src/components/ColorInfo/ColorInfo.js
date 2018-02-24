import React from 'react'
import './ColorInfo.css'

const ColorInfo = props => (
  <p className="color-info">
    {props.rgb}
    <span
      style={{
        margin: '0 1em',
        background: props.rgb,
        color: props.rgb,
      }}>
      HSV
    </span>
    {props.hex}
  </p>
)

export default ColorInfo
