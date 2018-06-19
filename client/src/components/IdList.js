import React from 'react'
import PropTypes from 'prop-types'

const IdList = (props) => {
  return (
    <ul>
      {props.listItems.map((el, i)=>(
        <li key={i} className="form-inline">
          <input type="checkbox" disabled={props.disabled}/>
          <span disabled={props.disabled}> {el} </span>
        </li>
      ))}
    </ul>
  )
};
IdList.propTypes = {
  listItems: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default IdList