import { Component } from 'react';
import PropTypes from 'prop-types'

const initialState = {
  id_token: null,
  name: null,
  imageUrl: null,
  email: null,
}

class GoogleUser extends Component {
  constructor(props) {
    super(props)
    this.currentUser = this.currentUser.bind(this)
  }
  currentUser(user) {
    const profile = user.getBasicProfile()
    if (profile) {
      this.setState({
        id_token: user.getAuthResponse().id_token,
        name: profile.getName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail(),
      })
    } else {
      this.setState(initialState)
    }
    if (this.props.currentUser) {
      this.props.currentUser(this.state)
    }
  }
  componentWillMount() {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: this.props.client_id
      })
      auth2.isSignedIn.listen(this.props.isSignedIn);
      auth2.currentUser.listen(this.currentUser);
    })
  }
  render() {
    return null
  }
}
GoogleUser.propTypes = {
  isSignedIn: PropTypes.func,
  currentUser: PropTypes.func,
  client_id: PropTypes.string.isRequired,
};
export default GoogleUser
