import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create_blog } from '../reducers/blogReducer'
import { set_notification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap-floating-label'

const AddBlogForm = ({ toggle }) => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const notificationDuration = 3

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSetTitle = ({ target }) => setTitle(target.value)
  const handleSetAuthor = ({ target }) => setAuthor(target.value)
  const handleSetUrl = ({ target }) => setUrl(target.value)

  const create = async (event) => {
    event.preventDefault()
    const newBlog = { title: title, author: author, url: url }
    if (newBlog.title && newBlog.author && newBlog.url) {
      if (!(blogs.filter(blog => newBlog.title === blog.title).length > 0)) {
        try {
          dispatch(create_blog(newBlog))
          toggle({ name: 'blogForm' })
          dispatch(set_notification(`a new blog '${newBlog.title}' by '${newBlog.author}' created!`, notificationDuration))
        } catch (exception) {
          dispatch(set_notification(exception.message, notificationDuration))
        }
      } else {
        dispatch(set_notification(`duplicate found for ${newBlog.title}`, notificationDuration))
      }
    } else {
      dispatch(set_notification('error: Pls check the fields!', notificationDuration))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const inputWidth = {
    width: '60%'
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <Form onSubmit={create}>
        <div className="col-xs-3">
          <Form.Group>
            <FloatingLabel
              controlId="floatingInputTitle"
              label="Title"
              className="mb-3"
              style={inputWidth}
              onChange={handleSetTitle}
            >
              <Form.Control
                width="50"
                type="text"
                value={title}
                id="Title"
                className="title"
              />
            </FloatingLabel>
          </Form.Group>
        </div>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInputAuthor"
            label="Author"
            className="mb-3"
            style={inputWidth}
            onChange={handleSetAuthor}
          >
            <Form.Control
              type="text"
              value={author}
              id="Author"
              className="author"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInputUrl"
            label="Url"
            className="mb-3"
            style={inputWidth}
            onChange={handleSetUrl}
          >
            <Form.Control
              type="text"
              id="BlogUrl"
              value={url}
              className="url"
            />
          </FloatingLabel>
          <Button variant="success" id="create-button" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddBlogForm