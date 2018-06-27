import React from 'react';
import GoogleSignIn from './GoogleSignIn'
import UserDropdown from './UserDropdown'
import { SourcesContainer } from '../Sources'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
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
            <Nav navbar>
              <UncontrolledDropdown>
                <DropdownToggle className="btn btn-light dropdown-toggle" caret>
                  Sources
                </DropdownToggle>
                <DropdownMenu>
                  <SourcesContainer/>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
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
