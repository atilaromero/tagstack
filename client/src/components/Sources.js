import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
  actions
} from '../ducks/sources';
import {
  actions as docActions
} from '../ducks/docs';

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
        <button className='btn btn-outline-primary'
          onClick={this.props.updateDocs}>
          Update
        </button>
        <hr/>
      </div>
    );
  }
}
Sources.propTypes = {
  select: PropTypes.func.isRequired,
  selected: PropTypes.string,
  update: PropTypes.func.isRequired,
  updateDocs: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

const List = (props) => {
  return (
    <ul>
      {Object.keys(props.listItems).map((el)=>(
        <li key={el} className="form-inline">
          <div className="form-group" onClick={()=>{
            props.select(el)
          }}>
            <input type="checkbox" checked={el===props.selected} disabled={props.disabled}/>
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
  listItems: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return { ...state.sources }
}

function mapDispatchToProps(dispatch) {
  return {
    update: () => dispatch(actions.update()),
    updateDocs: () => dispatch(docActions.update()),
    select: (x) => dispatch(actions.select(x)),
  };
}

export const SourcesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources);
