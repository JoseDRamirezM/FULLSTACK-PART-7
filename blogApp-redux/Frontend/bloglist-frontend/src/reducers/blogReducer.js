import blogService from '../services/blogs'
import { set_notification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  console.log('state now', state)
  console.log('action', action)
  switch (action.type) {
  case 'CREATE': {
    const blogObject = action.data
    return [...state, blogObject]
  }
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.result.id ? blog : action.result)
  case 'INIT_BLOGS':
    return action.content
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      content: blogs
    })
  }
}

export const create_blog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

let notificationDuration = 3

export const like_blog = blog => {
  return async dispatch => {
    if (blog)  {
      try {
        const blogData = {
          ...blog,
          likes: blog.likes + 1
        }
        const result = await blogService.like(blog.id, blogData)
        dispatch({
          type: 'LIKE_BLOG',
          result
        })
      } catch (exception) {
        dispatch(set_notification(exception.message, notificationDuration))
      }
    } else {
      dispatch(set_notification('something went wrong!', notificationDuration))
    }
  }
}

export const remove_blog = id => {
  return async dispatch => {
    if (window.confirm('remove blog?')) {
      try {
        await blogService.remove(id)
        dispatch(set_notification('blog removed', notificationDuration))
        dispatch({
          type: 'REMOVE_BLOG',
          id
        })
      } catch (exception) {
        dispatch(set_notification(exception.message, notificationDuration))
      }
    }
  }
}

export default blogReducer