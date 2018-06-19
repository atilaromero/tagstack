import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
  actions
} from '../ducks/docs';

export class Docs extends Component {
  render() {
    return (
      <form onSubmit={ e => {
        e.preventDefault()
        this.props.update()
      }}>
        <input type="submit" value="List"
          disabled={this.props.isLoading}
        />
        <hr/>
        <List
          listItems={this.props.data}
          disabled={this.props.isLoading}
        />
      </form>
    )
  }
}
Docs.propTypes = {
  update: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

const List = (props) => {
  return (
    <ul>
      {props.listItems.map((el, i)=>(
        <li key={i} className="form-inline">
          <input type="checkbox" disabled={props.disabled}/>
          <span disabled={props.disabled}> {JSON.stringify(el)} </span>
        </li>
      ))}
    </ul>
  )
};
List.propTypes = {
  listItems: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
}


function mapStateToProps(state) {
  return {
    data:   state.docs.data,
    isLoading:   state.docs.isLoading,
    error:   state.docs.error,
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
)(Docs);
