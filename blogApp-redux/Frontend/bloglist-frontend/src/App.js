import React, { useEffect, useRef } from 'react'
import BlogsRender from './components/BlogsRender'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { init_user, log_out } from './reducers/userReducer'
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom'
import { get_all_users } from './reducers/usersReducer'

const App = () => {

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(get_all_users())
  }, [dispatch])

  useEffect(() => {
    dispatch(init_user())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  const clickedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id):
    null

  const handleLogOut = async () => {
    dispatch(log_out())
  }

  const toggleContainer = async (component) => {
    component.name === 'blogForm'
      ? await blogFormRef.current.toggleVisibility()
      : await loginFormRef.current.toggleVisibility()
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={loginFormRef}>
        <LoginForm
          toggle={toggleContainer}
        />
      </Togglable>
    )
  }

  const blogsRender = () => {
    return (
      <BlogsRender user={user} />
    )
  }

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <AddBlogForm
          toggle={toggleContainer} />
      </Togglable>
    )
  }

  return (
    <div className="container">
      <h1>Blog app</h1>
      <Menu user={user} handleLogOut={handleLogOut} />
      <Notification />
      {user === null && loginForm()}
      <Switch>
        <Route path="/blogs/:id">
          <Blog user={user} blog={clickedBlog} />
        </Route>
        <Route path="/users/:id">
          <User users={users} match={userMatch} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user !== null && addBlogForm()}
          {blogsRender()}
        </Route>
      </Switch>
    </div>
  )
}

export default App