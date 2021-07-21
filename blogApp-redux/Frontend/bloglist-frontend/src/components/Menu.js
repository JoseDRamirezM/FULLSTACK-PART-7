import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Menu = ({ user, handleLogOut }) => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  const padding = {
    paddingRight: 5,
    margin: 5
  }

  if(!user) {
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
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

  const DBuser = users.find(u => user.username === u.username)

  const logOutStyle = {
    float: 'right',
    margin: 5,
  }

  const logOutContainer = {
    display: 'flex',
    alignItems: 'center'
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
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {(user && DBuser) !== null &&
            <div style={logOutContainer}>
              Logged in as
              { DBuser &&
                <div>
                  <Link to={`/users/${DBuser.id || ''}`} style={padding}>
                    {user.name}
                  </Link>
                </div>
              }
              <Button
                style={logOutStyle}
                size="sm"
                variant="secondary"
                onClick={handleLogOut}
              >
                logout
              </Button>
            </div>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu