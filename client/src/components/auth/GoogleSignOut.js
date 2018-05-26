import React from 'react';
import { NavLink } from 'reactstrap'

class GoogleSignOut extends React.Component{

  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut()
  }

  render() {
    return(
      <NavLink
        href="#"
        onClick={this.signOut}>
        Sign out
      </NavLink>
    )
  }
}

export default GoogleSignOut
