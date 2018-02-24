import React from 'react'
import './HsvCylinder.css'

const HsvCylinder = props => (
  <section className="hsv">
    <canvas
      className="hsv__canvas"
      ref={props.canvasRef}
      width={props.diameter}
      height={props.diameter}
      onMouseMove={props.mouseMoved}
    />
    <label className="range--value">
      <input
        className="range--value__input"
        type="range"
        min="0"
        max="1"
        step=".01"
        onChange={props.chenged}
      />
    </label>
  </section>
)

export default HsvCylinder
