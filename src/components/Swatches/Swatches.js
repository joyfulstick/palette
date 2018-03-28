import './Swatches.css'
import React from 'react'
import { connect } from 'react-redux'

const Swatches = props => (
  <section ref={props.swatchesRef} className="swatches">
    {props.schemes.map((swatch, i) => (
      <div className="swatches__samples" key={i}>
        {swatch.map((color, i) => (
          <div
            key={color + i}
            className="samples__color"
            style={{ background: color }}
          />
        ))}
      </div>
    ))}
  </section>
)

const mapStateToProps = state => {
  const { schemes } = state
  return {
    schemes,
  }
}

export default connect(mapStateToProps)(Swatches)
