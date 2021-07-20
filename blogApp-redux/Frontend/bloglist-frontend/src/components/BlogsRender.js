import React from 'react'
import BlogList from './BlogList'
import { useSelector } from 'react-redux'

const BlogsRender = ({ user }) => {

  const blogs = useSelector(state =>
    state.blogs.sort((b, next) => {
      return next.likes - b.likes
    })
  )

  return (
    <div className="blog-list">
      {blogs.map(blog =>
        <BlogList
          key={blog.id}
          blog={blog}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogsRender