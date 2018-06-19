import React from 'react';
import PropTypes from 'prop-types'

const DocLister = (props) => {
  return (
    <ul>
      {props.data.map((el, i)=>(
        <li key={i}>
          <span > {el.tamanho} </span>
        </li>
      ))}
    </ul>
  )
};
DocLister.propTypes = {
  data: PropTypes.array.isRequired,
}

export default DocLister
