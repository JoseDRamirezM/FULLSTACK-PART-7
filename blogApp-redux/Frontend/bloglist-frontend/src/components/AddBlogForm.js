import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create_blog } from '../reducers/blogReducer'
import { set_notification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'


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

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
                    title:
          <input
            type="text"
            value={title}
            id="Title"
            onChange={handleSetTitle}
            className="title"
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            id="Author"
            onChange={handleSetAuthor}
            className="author"
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            id="BlogUrl"
            value={url}
            onChange={handleSetUrl}
            className="url"
          />
        </div>
        <Button variant="primary" id="create-button">create</Button>
      </form>
    </div>
  )
}

export default AddBlogForm