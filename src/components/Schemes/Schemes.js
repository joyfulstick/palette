import './Schemes.css'
import * as actions from '../../store/actions'
import { COLOR_SCHEMES } from '../../constants/colorSchemes'
import React from 'react'
import { connect } from 'react-redux'

const Schemes = props => (
  <form className="schemes">
    {COLOR_SCHEMES.map(scheme => (
      <label className="scheme__label" htmlFor={scheme.name} key={scheme.id}>
        <input
          type="radio"
          name="scheme"
          id={scheme.name}
          value={scheme.id}
          onChange={props.onSchemeChange}
          checked={props.schemeModel === scheme.id}
        />
        {scheme.name}
      </label>
    ))}
  </form>
)

const mapStateToProps = state => {
  const { schemeModel } = state
  return {
    schemeModel,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSchemeChange: e => dispatch(actions.schemeChange(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schemes)
