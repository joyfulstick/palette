import React from 'react'
import './Schemes.css'

const Schemes = props => (
  <form className="schemes">
    <label className="scheme__label" htmlFor="monochromatic">
      <input
        type="radio"
        name="scheme"
        id="monochromatic"
        value="1"
        onChange={props.chenged}
        checked={props.checked === 1}
      />
      Monochromatic
    </label>
    <label className="scheme__label" htmlFor="complementary">
      <input
        type="radio"
        name="scheme"
        id="complementary"
        value="2"
        onChange={props.chenged}
        checked={props.checked === 2}
      />
      Complementary
    </label>
    <label className="scheme__label" htmlFor="triadic">
      <input
        type="radio"
        name="scheme"
        id="triadic"
        value="3"
        onChange={props.chenged}
        checked={props.checked === 3}
      />
      Triadic
    </label>
    <label className="scheme__label" htmlFor="tetradic">
      <input
        type="radio"
        name="scheme"
        id="tetradic"
        value="4"
        onChange={props.chenged}
        checked={props.checked === 4}
      />
      Tetradic
    </label>
  </form>
)

export default Schemes
