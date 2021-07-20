import loginService from '../services/login'
import blogService from '../services/blogs'
import { set_notification } from './notificationReducer'

const intialState = null

const userReducer = (state = intialState, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return intialState
  default : return state
  }
}

export const init_user = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        user
      })
    }
  }
}

export const login_user = user => {
  return async dispatch => {
    try {
      const loggedUser =
            await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(loggedUser)
      )
      await blogService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN',
        user: loggedUser
      })
    } catch (exception) {
      dispatch(set_notification('invalid username or password', 3))
    }
  }
}

export const log_out = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer