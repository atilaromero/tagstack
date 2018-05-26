import React from 'react';
import PropTypes from 'prop-types'

class GoogleSignIn extends React.Component{
  componentDidMount() {
    const options = {
      'scope': 'profile email',
    }
    if (this.props.big){
      options.width = 240
      options.height = 50
      options.longtitle = true
    }
    window.gapi.signin2.render('g-signin2', options);
  }

  render() {
    return(
      <div id="g-signin2" ></div>
    )
  }
}
GoogleSignIn.propTypes = {
  big: PropTypes.bool,
}
export default GoogleSignIn
