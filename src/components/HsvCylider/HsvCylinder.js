import React from 'react'
import './HsvCylinder.css'

const HsvCylinder = props => (
  <section className="hsv">
    <canvas
      className={
        props.alpha !== 0 && props.picking
          ? 'canvas--picking'
          : 'canvas--picked'
      }
      ref={props.canvasRef}
      width={props.diameter}
      height={props.diameter}
      onMouseMove={props.mouseMoved}
      onClick={props.clicked}
    />
    {!props.picking && <em className="color--picked">Picked!</em>}
    <form className="range--value" style={{ width: props.diameter / 3 }}>
      <input
        className="range--value__input"
        type="range"
        min="0"
        max="1"
        step=".01"
        onChange={props.chenged}
      />
    </form>
  </section>
)

export default HsvCylinder
