import React from "react"
import {} from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <Navbar bg="success" expand="lg">
        <NavLink className="navbar-brand" to="/" exact>
        <img
            src="./logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
        />
        {' '}Suttipong
        </NavLink>
        {/* <Navbar.Brand href="#home">

        
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/" exact activeClassName="active">
            Suttipong HOME
            </NavLink>
            <NavLink className="nav-link" to="/about"  activeClassName="active">
            เกี่ยวกับเรา
            </NavLink>
            <NavLink className="nav-link" to="/product"  activeClassName="active">
            สินค้า
            </NavLink>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
