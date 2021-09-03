import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import "./index.css"

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <Navbar light expand="md" className="px-3 py-4 nav-bar">
        <NavbarBrand href="/" className="nav-brand">Frequencies</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar  className="nav-link-group">
          <Nav navbar>
            <NavItem className="nav-items">
              <Link to="/" className="nav-links">Home</Link>
              <Link to="/explore" className="nav-links">Explore</Link>
              <Link to="/create" className="nav-links">Create</Link>
              <Link to="/favorites" className="nav-links">Favorites</Link>
            </NavItem>
            <NavItem>
              {Auth.loggedIn() ? (
            <>
              <Link onClick={logout} className="logout-link">Logout</Link>
            </>
          ) : (
              <Link to="/login" className="login-link">Login</Link>
          )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default Header;
