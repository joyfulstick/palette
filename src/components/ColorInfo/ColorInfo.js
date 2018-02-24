import React from 'react'
import './ColorInfo.css'

const ColorInfo = props => (
  <article className="color-info">
    {Object.entries(props).map(([model, color]) => (
      <p key={model}>
        <span
          className="color-info__sample"
          style={{
            background: color,
            color,
          }}>
          {model}
        </span>
        {color}
      </p>
    ))}
  </article>
)

export default ColorInfo
