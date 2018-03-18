import React from 'react'
import './CssCode.css'

const CssCode = props => (
  <div className="css">
    <code
      className="css__code"
      dangerouslySetInnerHTML={props.innerHTML}
      onClick={props.clicked}
    />
    <button className="css__button" onClick={this.handlePick}>
      Pick another color
    </button>
  </div>
)

export default CssCode
