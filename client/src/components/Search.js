import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
  actions
} from '../ducks/search';

export class Search extends Component {
  render() {
    return (
      <form onSubmit={ e => {
        e.preventDefault()
        this.props.update()
      }}>
        <input required type="text"
          value={this.props.query}
          onChange={ e => this.props.setQuery(e.target.value)}
          disabled={this.props.isLoading}
        />
        <input type="submit" value="Search"
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
Search.propTypes = {
  update: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
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
          <span disabled={props.disabled}> {el} </span>
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
    query: state.search.query,
    data:   state.search.data,
    isLoading:   state.search.isLoading,
    error:   state.search.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: () => dispatch(actions.update()),
    setQuery: (q) => dispatch(actions.setQuery(q)),
  };
}

export const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
