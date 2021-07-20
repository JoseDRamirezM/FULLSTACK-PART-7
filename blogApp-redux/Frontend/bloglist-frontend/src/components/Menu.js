import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogOut }) => {

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/" style={padding}>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users" style={padding}>users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user !== null && <p>{user.name} logged <button onClick={handleLogOut} >logout</button></p>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu