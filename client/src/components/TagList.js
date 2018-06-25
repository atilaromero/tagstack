import React from 'react'
import PropTypes from 'prop-types'

class TagList extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidUpdate() {
    const first = Object.keys(this.props.tags)[0]
    if (!this.state.choice && first) {
      this.setState({choice: first})
      this.props.onChoice(first)
    }
  }
  handleChange(e) {
    this.setState({choice: e.target.value})
    this.props.onChoice(e.target.value)
  }
  render() {
    return (
      <form>
        <ul style={{listStyleType:'none'}}>
          {Object.keys(this.props.tags).map((el, i)=>(
            <li key={i}>
              <div className="input-group mb-3" style={{width:'100%'}}>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <input type="radio"
                      name="radio1"
                      value={el}
                      checked={this.state.choice === el}
                      onChange={this.handleChange}
                    />
                  </span>
                </div>
                <input type="text" readOnly className="form-control"
                  value={el}
                  onClick={this.handleChange}
                />
              </div>
            </li>
          ))}
        </ul>
      </form>
    )
  }
}
TagList.propTypes = {
  tags: PropTypes.object.isRequired,
  onChoice: PropTypes.func,
}

export default TagList