import { Component } from 'react';
import PropTypes from 'prop-types'

class Data extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.user && this.props.user !== prevProps.user) {
      this.getData();
    }
  }

  async getData() {
    try {
      const res = await fetch('/data', {
        headers: {
          Authorization: 'Bearer ' + this.props.user.id_token,
        }
      })
      if (!res.ok) {
        const error = await res.json()
        throw error
      }
      const data = await res.json()
      this.setState({ data })
      this.props.onData(data)
    } catch(error) {
      this.setState({ data: null })
      this.props.onData(null)
      this.setState({ error })
    }
  }

  render() {
    return null
  }
}
Data.propTypes = {
  user: PropTypes.object.isRequired,
  onData: PropTypes.func.isRequired,
}
export default Data
