import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c3 from 'c3'

class Element extends Component {
  constructor(props){
    super(props)
    this.createElement = this.createElement.bind(this)
    this.indexToID = this.indexToID.bind(this)
    this.idToIndex = this.idToIndex.bind(this)
  }
  indexToID(index) {
    return this.props.json[index].obj_id
  }
  idToIndex(id) {
    return this.props.json.findIndex(x => x.obj_id === id)
  }
  componentDidMount() {
    this.createElement(this.props)
  }
  componentDidUpdate() {
    this.disabled = true
    const newSel = Array.from(new Set(this.props.selection.map(this.idToIndex).filter(x=> x!==-1))).sort()
    try {
      this.chart.load({
        ...this.options.data,
        json: this.props.json,
      })
      this.chart.select(null, newSel, true)
      this.disabled = false
    } catch (error) {
      this.chart.unload({
        done: () => {
          this.chart.load({
            ...this.options.data,
            json: this.props.json,
            done: () => {
              this.chart.select(null, newSel, true)
              this.disabled = false
            }
          })
        }
      })
    }
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
            this.props.onselected(this.indexToID(sel.index))
        },
        onunselected: sel => {
          if (!this.disabled)
            this.props.onunselected(this.indexToID(sel.index))
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
