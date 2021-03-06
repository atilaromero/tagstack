import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c3 from 'c3'
const uuidv4 = require('uuid/v4')

class C3Size extends Component {
  constructor(props){
    super(props)
    this.createC3Size = this.createC3Size.bind(this)
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
    this.createC3Size(this.props, this.id)
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
  createC3Size(props, id) {
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
          tick: {
            format: y => {
              let x = y
              x = (y>1024)?`${(y/1024).toFixed(1)}KiB`:x
              x = (y>1024**2)?`${(y/1024**2).toFixed(1)}MiB`:x
              x = (y>1024**3)?`${(y/1024**3).toFixed(1)}GiB`:x
              x = (y>1024**4)?`${(y/1024**4).toFixed(1)}TiB`:x
              return x
            }
          }
        }
      },
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
      zoom: {
        enabled: true,
        rescale: true,
      },
      subchart: {
        show: true
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
C3Size.propTypes = {
  json: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  onselected: PropTypes.func.isRequired,
  onunselected: PropTypes.func.isRequired,
}
export default C3Size
