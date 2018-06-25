import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { actions } from '../ducks/docs';

export class TagAdd extends Component {
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
      <form onSubmit={this.handleSubmit}  style={{paddingTop: '10px'}}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <input className="btn btn-primary"
              type="submit" value="Tag"/>
          </div>
          <input required type="text"
            className="form-control"
            placeholder="tag selection as"
            aria-label="labelalskdflksjd"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      </form>
    )
  }
}
TagAdd.propTypes = {
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

export const TagAddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagAdd);
