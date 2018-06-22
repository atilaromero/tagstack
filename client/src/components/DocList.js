import React from 'react';
import PropTypes from 'prop-types'

const Element = (props) => {
  return (
    <ul>
      {props.data.map((el, i)=>(
        <li key={i}>
          <span > {el.file} </span>
        </li>
      ))}
    </ul>
  )
};
Element.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Element
