import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    margin: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        {blog.title} <strong>{blog.author}</strong>
      </Link>
    </div>
  )
}

export default BlogList