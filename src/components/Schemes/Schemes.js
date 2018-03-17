import React from 'react'
import { COLOR_SCHEMES } from '../../constants/colorSchemes'
import './Schemes.css'

const Schemes = props => (
  <form className="schemes">
    {COLOR_SCHEMES.map(scheme =>
      <label className="scheme__label" htmlFor={scheme.name} key={scheme.id}>
        <input
          type="radio"
          name="scheme"
          id={scheme.name}
          value={scheme.id}
          onChange={props.chenged}
          checked={props.checked === scheme.id}
        />
        {scheme.name}
      </label>)}
  </form>
)

export default Schemes
