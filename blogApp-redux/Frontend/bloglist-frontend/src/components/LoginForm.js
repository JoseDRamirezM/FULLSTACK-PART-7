import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login_user } from '../reducers/userReducer'
import { Button, Form } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap-floating-label'


const LoginForm = ({ toggle }) => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSetUsername = ({ target }) => setUsername(target.value)
  const handleSetPassword = ({ target }) => setPassword(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login_user({ username, password }))
    toggle({ name: 'loginForm' })
    setPassword('')
    setUsername('')
  }

  const inputWidth = {
    width: '40%'
  }

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label><h2>log in the app</h2></Form.Label>
        </Form.Group>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInputUsername"
            label="Username"
            className="mb-3"
            style={inputWidth}
            onChange={handleSetUsername}
          >
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              id="username"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInputPassword"
            label="Password"
            style={inputWidth}
            onChange={handleSetPassword}
            type="password"
          >
            <Form.Control
              value={password}
              placeholder="Password"
              id="password"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit" id="login-button">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  toggle: PropTypes.func.isRequired
}
export default LoginForm