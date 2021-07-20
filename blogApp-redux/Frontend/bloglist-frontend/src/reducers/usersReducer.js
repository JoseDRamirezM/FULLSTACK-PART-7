import userService from '../services/users'

const intialState = null

const usersReducer = (state = intialState, action) => {
  switch (action.type) {
  case 'GET_ALL_USERS':
    return action.users
  default: return state
  }
}

export const get_all_users = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_ALL_USERS',
      users
    })
  }
}

export default usersReducer