import React from 'react'
import { like_blog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {

  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const likeBlog = () => {
    dispatch(like_blog(blog))
  }

  return (
    <div >
      <div className="details">
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p className="likes">{blog.likes} likes <button onClick={likeBlog} className="likeButton">like</button></p>
        <p>added by <strong>{blog.author}</strong></p>
      </div>

      <div className="comments">
        <h3>comments</h3>
      </div>
    </div>
  )
}

export default Blog