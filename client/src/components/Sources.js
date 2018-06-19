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
      <div>
        <h4>Sources</h4>
        {/* <hr/> */}
        <List
          listItems={this.props.list}
          disabled={this.props.isLoading}
          select={this.props.select}
          selected={this.props.selected}
        />
        {(this.props.error) ?
          <span style={{color: 'red'}}>Error: {this.props.error}</span>
          :''
        }
        <hr/>
      </div>
    );
  }
}
Sources.propTypes = {
  select: PropTypes.func.isRequired,
  selected: PropTypes.string,
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
          <div className="form-group" onClick={e=>{
            e.preventDefault()
            props.select(el)
          }}>
            <input type="checkbox" checked={(el===props.selected)} disabled={props.disabled}/>
            <span disabled={props.disabled}> {el} </span>
          </div>
        </li>
      ))}
    </ul>
  )
};
List.propTypes = {
  select: PropTypes.func.isRequired,
  selected: PropTypes.string,
  listItems: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return { ...state.sources }
}

function mapDispatchToProps(dispatch) {
  return {
    update: () => dispatch(actions.update()),
    select: (x) => dispatch(actions.select(x)),
  };
}

export const SourcesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources);
