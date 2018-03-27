import './ColorInfo.css'
import * as actions from '../../store/actions'
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
            onClick={props.onTogglePick}
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
  const { picking } = state
  return {
    rgb,
    hex,
    picking,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTogglePick: () => dispatch(actions.togglePick()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorInfo)
