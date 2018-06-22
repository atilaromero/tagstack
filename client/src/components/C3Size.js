import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c3 from 'c3'

class Element extends Component {
  constructor(props){
    super(props)
    this.createElement = this.createElement.bind(this)
  }
  componentDidMount() {
    this.createElement(this.props)
  }
  componentWillReceiveProps(newProps) {
    this.chart.load({
      ...this.options.data,
      json: newProps.json,
    })
    this.chart.select([], newProps.selection, true)
  }
  createElement(props) {
    this.options = {
      bindto: '#chart1',
      data: {
        json: props.json,
        keys: {
          value: ['size']
        },
        type: 'area',
        selection: {
          enabled: true,
          multiple: true,
          draggable: true,
        },
        onselected: sel => this.props.onselected(sel.index),
        onunselected: sel => this.props.onunselected(sel.index),
      },
      subchart: {
        show: true
      },
    }
    this.chart = c3.generate(this.options)
  }
  render() {
    return (
      <div className="row" id="chart1"></div>
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