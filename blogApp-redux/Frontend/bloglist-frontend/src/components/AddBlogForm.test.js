import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <AddBlogForm createBlog={createBlog} />
  )
  const title = component.container.querySelector('#Title')
  const author = component.container.querySelector('.author')
  const url = component.container.querySelector('.url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'This is a test' }
  })

  fireEvent.change(author, {
    target: { value: 'author test' }
  })

  fireEvent.change(url, {
    target: { value: 'test url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is a test' )
  expect(createBlog.mock.calls[0][0].author).toBe('author test' )
  expect(createBlog.mock.calls[0][0].url).toBe('test url' )
})