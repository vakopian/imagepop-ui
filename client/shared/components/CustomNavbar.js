//Reusable component for navbar on all pages

import React, { PropTypes, Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import styles from '../../../public/css/navbar.css';

export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">image | pop</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="/about">about</NavItem>
            <NavItem eventKey={2} href="/demo">gallery</NavItem>
            <NavItem eventKey={3} href="/main">upload</NavItem>
            <NavItem eventKey={4} href="/login">login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}