import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ match }) => {

  const users = useSelector(state => state.users)

  if(!users) {
    return null
  }

  const user = users.find(user => user.id === match.params.id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map( blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>

  )
}

export default User