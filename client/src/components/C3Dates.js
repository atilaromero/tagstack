import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c3 from 'c3'
const uuidv4 = require('uuid/v4')

class C3Dates extends Component {
  constructor(props){
    super(props)
    this.createC3Dates = this.createC3Dates.bind(this)
    this.indexToID = this.indexToID.bind(this)
    this.idToIndex = this.idToIndex.bind(this)
  }
  indexToID(index) {
    return this.props.json[index].obj_id
  }
  idToIndex(id) {
    return this.props.json.findIndex(x => x.obj_id === id)
  }
  componentWillMount() {
    this.id = 'id-'+uuidv4().slice(0,8);
  }
  componentDidMount() {
    this.createC3Dates(this.props, this.id)
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
  createC3Dates(props, id) {
    this.options = {
      bindto: '#'+id,
      grid: {
        x: {
          show: true
        },
        y: {
          show: true
        },
      },
      axis: {
        x: {
          tick: {
            format: (x) => this.indexToID(x),
            // rotate: 60,
            culling:false,
            fit: true,
          }
        },
        y: {
          type: 'timeseries',
          tick: {
            format: y => {
              const x = (y<10000000000)?y*1000:y
              return x?new Date(x).toISOString().slice(0):x
            }
          }
        }
      },
      zoom: {
        enabled: true,
        rescale: true,
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
            this.props.onselected(this.indexToID(sel.index))
        },
        onunselected: sel => {
          if (!this.disabled)
            this.props.onunselected(this.indexToID(sel.index))
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
C3Dates.propTypes = {
  json: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  onselected: PropTypes.func.isRequired,
  onunselected: PropTypes.func.isRequired,
}
export default C3Dates
