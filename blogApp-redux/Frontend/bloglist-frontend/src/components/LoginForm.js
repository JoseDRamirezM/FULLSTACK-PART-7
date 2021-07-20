import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login_user } from '../reducers/userReducer'

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

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            type="text"
            value={username}
            id="username"
            onChange={handleSetUsername}
          />
        </div>
        <div>
                password
          <input
            type="password"
            value={password}
            id="password"
            onChange={handleSetPassword}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  toggle: PropTypes.func.isRequired
}
export default LoginForm