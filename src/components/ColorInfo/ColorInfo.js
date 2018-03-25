import './ColorInfo.css'
import React from 'react'
import { connect } from 'react-redux'

const ColorInfo = props => (
  <article className="color-info">
    {Object.entries(props)
      .filter(([p, v]) => p === 'hex' || p === 'rgb')
      .map(([model, color]) => (
        <p key={model}>
          <span
            className={
              props.picking ? 'color-info__sample' : 'color-info__sample lock'
            }
            style={{
              background: color,
              color,
            }}
            onClick={props.clicked}
          >
            {model}
          </span>
          {color}
        </p>
      ))}
  </article>
)

const mapStateToProps = state => {
  const { rgb, hex } = state.rgbColors
  const { picking } = state.picking
  return {
    rgb,
    hex,
    picking,
  }
}

export default connect(mapStateToProps)(ColorInfo)
