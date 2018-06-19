import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
  actions
} from '../ducks/docs';

export const DocList = (props) => {
  return (
    <ul>
      {props.data.map((el, i)=>(
        <li key={i}>
          <span > {el.caminho} </span>
        </li>
      ))}
    </ul>
  )
};
DocList.propTypes = {
  data: PropTypes.array.isRequired,
}


function mapStateToProps(state) {
  return {
    data:   state.docs.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: () => dispatch(actions.update()),
  };
}

export const DocsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocList);
