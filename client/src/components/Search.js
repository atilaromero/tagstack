import { Component } from 'react';
import PropTypes from 'prop-types'

class Search extends Component {

  componentDidUpdate(prevProps) {
    if (!this.props.user) return;
    if (this.props.user !== prevProps.user ||
        this.props.query !== prevProps.query) {
      this.getData(this.props.query);
    }
  }

  async getData(query) {
    try {
      const url = "/search?q=" + encodeURIComponent(query)
      const res = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + this.props.user.id_token,
        }
      })
      if (!res.ok) {
        const error = await res.text()
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
Search.propTypes = {
  query: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onData: PropTypes.func.isRequired,
}
export default Search
