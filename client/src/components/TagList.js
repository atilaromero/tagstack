import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { actions } from '../ducks/docs'

const TagList = (props) => {
  return (
    <ul>
      {Object.keys(props.tags).map((el, i)=>(
        <li key={i}>
          <button onClick={() => props.onClick(el)}> {el} </button>
        </li>
      ))}
    </ul>
  )
};
TagList.propTypes = {
  tags: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default TagList

function mapStateToProps(state) {
  return {
    tags:   state.docs.tags,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: (tag) => {dispatch(actions.loadTag(tag))}
  };
}

export const TagListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList)
