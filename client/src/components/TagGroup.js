import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { actions } from '../ducks/docs'
import { selectors } from '../ducks/docs'
import { TagAddContainer } from './TagAdd'
import TagList from './TagList'

class TagGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
    this.handleClear = this.handleClear.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handlePull = this.handlePull.bind(this)
    this.handleIgnore = this.handleIgnore.bind(this)
  }
  componentDidUpdate() {
    const first = Object.keys(this.props.tags)[0]
    if (!this.state.choice && first) {
      this.setState({choice: first})
    }
  }
  handleClear() {
    this.props.clear()
  }
  handleAdd() {
    const oldSelection = this.props.selection
    const oldTag = this.props.tags[this.state.choice]
    const newTag = [...oldTag, ...oldSelection]
    this.props.setSelection(newTag)
    this.props.addTag(this.state.choice)
    this.props.setSelection(oldSelection)
  }
  handleRemove() {
    const oldSelection = this.props.selection
    const oldTag = this.props.tags[this.state.choice]
    const newTag = oldTag.filter(x => !oldSelection.includes(x))
    this.props.setSelection(newTag)
    this.props.addTag(this.state.choice)
    this.props.setSelection(oldSelection)
  }
  handlePull() {
    const oldSelection = this.props.selection
    const oldTag = this.props.tags[this.state.choice]
    const newTag = [...oldTag, ...oldSelection]
    this.props.setSelection(newTag)
  }
  handleIgnore() {
    const oldSelection = this.props.selection
    const oldTag = this.props.tags[this.state.choice]
    const newTag = oldSelection.filter(x => !oldTag.includes(x))
    this.props.setSelection(newTag)
  }
  render (){
    return (
      <div className="container" style={{paddingTop: '10px'}}>
        <div className="row">
          <div className="col-md-6">
            <TagAddContainer/>
          </div>
          <div className="col-md-6">
            {this.props.selection.length} selected itens
            <br/>
            {this.props.selection
              .filter(x => !this.props.visibleIds.includes(x))
              .length
            } itens not shown
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <button className="btn btn-outline-danger"
                onClick={this.handleClear}>
                Clear selection
              </button>
            </div>
          </div>
        </div>
        {(Object.keys(this.props.tags)[0])?
          <div className="row">
            <div className="col-md-12">
              <div className="container">
                <div className="row">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        Tags
                        <TagList
                          tags={this.props.tags}
                          onChoice={v => this.setState({choice: v})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                </div>
                <div className="row">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <button className="btn btn-outline-success"
                        onClick={this.handleAdd}>
                        Add selected items to
                      </button>
                    </div>
                    <input type="text" readOnly
                      className="form-control"
                      value={this.state.choice||''}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-danger"
                        onClick={this.handleRemove}>
                        Remove selected items from
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <button className="btn btn-outline-success"
                        onClick={this.handlePull}>
                        Pull items from
                      </button>
                    </div>
                    <input type="text" readOnly
                      className="form-control"
                      value={this.state.choice||''}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-danger"
                        onClick={this.handleIgnore}>
                        Ignore items from
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :null
        }
      </div>
    )
  }
}
TagGroup.propTypes = {
  tags: PropTypes.object.isRequired,
  selection: PropTypes.array.isRequired,
  visibleData: PropTypes.array.isRequired,
  visibleIds: PropTypes.array.isRequired,
  clear: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  loadTag: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
  unselect: PropTypes.func.isRequired,
}

export default TagGroup

function mapStateToProps(state) {
  return {
    tags:   state.docs.tags,
    selection: state.docs.selection,
    visibleData: state.docs.visibleData,
    visibleIds: selectors.getVisibleIds(state.docs),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadTag: (tag) => {dispatch(actions.loadTag(tag))},
    addTag: (tag) => {dispatch(actions.addTag(tag))},
    setSelection: data => {dispatch(actions.setSelection(data))},
    select: data => {dispatch(actions.select(data))},
    unselect: data => {dispatch(actions.unselect(data))},
    clear: () => {dispatch(actions.clear())},
  };
}
export const TagGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagGroup)
