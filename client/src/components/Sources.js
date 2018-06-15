import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
  actions
} from '../ducks/sources';

export class Sources extends React.Component {
  componentDidMount() {
    this.props.update()
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3>Sources</h3>
              <hr/>
              <List
                listItems={this.props.list}
                disabled={this.props.isLoading}
              />
              {(this.props.error) ?
                <span style={{color: 'red'}}>Error: {this.props.error}</span>
                :''
              }
              <hr/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Sources.propTypes = {
  update: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

const List = (props) => {
  return (
    <ul>
      {props.listItems.map((el, i)=>(
        <li key={i} className="form-inline">
          <div className="form-group">
            <input type="checkbox" disabled={props.disabled}/>
            <span disabled={props.disabled}> {el} </span>
          </div>
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
  return { ...state.sources }
}

function mapDispatchToProps(dispatch) {
  return {
    update: () => dispatch(actions.update()),
  };
}

export const SourcesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources);
