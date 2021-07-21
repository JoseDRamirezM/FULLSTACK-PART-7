import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blog }) => {

  const listStyle = {
    fonstSize: 20
  }

  return (
    <div className="container" >
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        <div style={listStyle}>{blog.title} by <strong>{blog.author}</strong></div>
      </Link>
    </div>
  )
}

export default BlogList