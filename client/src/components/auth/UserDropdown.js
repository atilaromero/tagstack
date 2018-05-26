import React from 'react';
import GoogleSignIn from './GoogleSignIn'
import GoogleSignOut from './GoogleSignOut'
import PropTypes from 'prop-types'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class UserDropdown extends React.Component {
  render() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <img
            className="rounded-circle"
            width='40'
            src={this.props.user.imageUrl}
            alt={this.props.user.name}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            {this.props.user.email}
          </DropdownItem>
          <DropdownItem>
            <GoogleSignOut/>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <GoogleSignIn/>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
UserDropdown.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserDropdown
