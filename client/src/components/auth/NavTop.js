import React from 'react';
import GoogleSignIn from './GoogleSignIn'
import UserDropdown from './UserDropdown'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
} from 'reactstrap';


class NavTop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="primary" light expand="md">
          {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {(this.props.signedIn) ? (
              <Nav className="ml-auto" navbar>
                <UserDropdown user={this.props.user}/>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <GoogleSignIn/>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
NavTop.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
}
export default NavTop
