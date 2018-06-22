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
  componentDidUpdate() {
    this.chart.load({
      ...this.options.data,
      json: this.props.json,
    })
    const newSel = Array.from(new Set(this.props.selection)).sort()
    this.disabled=true
    this.chart.select(null, newSel, true)
    this.disabled=false
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