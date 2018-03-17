import React from 'react'
import './Swatches.css'

const Swatches = props => (
  <section className="swatches">
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

export default Swatches
