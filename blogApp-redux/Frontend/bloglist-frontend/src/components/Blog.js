import React, { useState, useEffect } from 'react'
import { comment_blog, like_blog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {

  if (!blog) {
    return null
  }

  //loading button
  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 900))
  }

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false)
      })
    }
  }, [isLoading])

  const handleClick = () => setLoading(true)

  //

  const [comment, setComment] = useState('')

  const handleSetComment = ({ target }) => setComment(target.value)

  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()
    !isLoading ? handleClick() : null
    dispatch(comment_blog(blog, comment))
    await setComment('')
  }

  const likeBlog = () => {
    dispatch(like_blog(blog))
  }

  const blogstyle = {
    padding: 10,
    fontSize: 20
  }

  return (
    <div className="container" style={blogstyle}>
      <div >
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>added by <strong>{blog.author}</strong></p>
        {blog.likes} likes  <Button
          size="sm"
          onClick={likeBlog}
          className="likeButton"
        >
          like
        </Button>
      </div>
      <hr/>
      <div className="comments">
        <h3>comments</h3>
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Control
              type="text"
              value={comment}
              id="comment"
              onChange={handleSetComment}
              placeholder="type a comment!"

            />
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              id="add-comment"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading…' : 'add comment'}
            </Button>
          </Form.Group>
        </Form>
        <ListGroup variant="flush">
          {blog.comments && blog.comments.map((comment, index) =>
            <ListGroup.Item key={index}>
              <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">{comment}</p>
                <small>{new Date().toJSON().slice(0,10).replace(/-/g,'/')}</small>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  )
}

export default Blog