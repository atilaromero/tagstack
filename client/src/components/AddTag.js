import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { actions } from '../ducks/docs';

export class AddTag extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addTag(this.state.value)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Save selection as:"/>
        <input required type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
AddTag.propTypes = {
  addTag: PropTypes.func.isRequired,
}

function mapStateToProps() {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTag: (tag) => dispatch(actions.addTag(tag)),
  };
}

export const AddTagContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTag);
