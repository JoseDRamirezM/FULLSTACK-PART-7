import React from 'react'
import BlogList from './BlogList'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const BlogsRender = ({ user }) => {

  const blogs = useSelector(state =>
    state.blogs.sort((b, next) => {
      return next.likes - b.likes
    })
  )

  const listStyle = {
    fonstSize: 25
  }


  return (
    <div className="blog-list">
      <h2>Blogs</h2>
      <ListGroup variant="flush">
        {blogs.map(blog =>
          <ListGroup.Item key={blog.id} style={{ fontSize: 25 }}>
            <div className="d-flex w-100 justify-content-between" style={listStyle}>
              <BlogList
                blog={blog}
                user={user}
              />
            </div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogsRender