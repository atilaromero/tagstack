import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c3 from 'c3'
const uuidv4 = require('uuid/v4')

class Element extends Component {
  constructor(props){
    super(props)
    this.createElement = this.createElement.bind(this)
  }
  componentWillMount() {
    this.id = 'id-'+uuidv4().slice(0,8);
  }
  componentDidMount() {
    this.createElement(this.props, this.id)
  }
  componentDidUpdate() {
    // if (!this.dontUpdate) {
    //   setTimeout(() => {
    //     if (this.dontUpdate){
    //       this.dontUpdate = false
    //       this.forceUpdate()
    //     }
    //   }, 10);
    // }
    this.chart.load({
      ...this.options.data,
      json: this.props.json,
    })
    const newSel = Array.from(new Set(this.props.selection)).sort()
    this.disabled = true
    this.chart.select(null, newSel, true)
    this.disabled = false
  }
  createElement(props, id) {
    this.options = {
      bindto: '#'+id,
      axis: {
        y: {
          type: 'timeseries'
        }
      },
      subchart: {
        show: true
      },
      data: {
        json: props.json,
        keys: {
          value: ['atime', 'mtime', 'crtime']
        },
        type: 'scatter',
        selection: {
          enabled: true,
          multiple: true,
          // draggable: true,
        },
        onselected: sel => {
          if (!this.disabled)
            this.props.onselected(sel.index)
        },
        onunselected: sel => {
          if (!this.disabled)
            this.props.onunselected(sel.index)
        },
      },
    }
    this.chart = c3.generate(this.options)
  }
  render() {
    return (
      <div className="row" id={this.id}></div>
    )
  }
}
Element.propTypes = {
  json: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  onselected: PropTypes.func.isRequired,
  onunselected: PropTypes.func.isRequired,
}
export default Element