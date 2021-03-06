import './CssCode.css'
import React from 'react'
import { connect } from 'react-redux'

const CssCode = props => (
  <React.Fragment>
    <button
      className="button--css"
      disabled={props.schemes.length === 0}
      onClick={props.clickedCreator}
      style={
        props.schemes.length === 0
          ? { cursor: 'not-allowed' }
          : { cursor: 'pointer' }
      }
    >
      CSS
    </button>
    {props.css && (
      <div className="css">
        <code
          className="css__code"
          dangerouslySetInnerHTML={props.innerHTML}
          onClick={props.clicked}
        />
        <button className="button--exit" onClick={props.clickExit}>
          Close
        </button>
      </div>
    )}
  </React.Fragment>
)

const mapStateToProps = state => {
  const { schemes } = state
  return {
    schemes,
  }
}

export default connect(mapStateToProps)(CssCode)
