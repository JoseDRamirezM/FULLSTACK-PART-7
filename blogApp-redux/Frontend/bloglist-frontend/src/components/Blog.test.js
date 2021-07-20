import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog = {
    title: 'This is a test',
    author: 'author test',
    url: 'test url',
    likes: 4,
    userId: '60cbad9bdeb77a4f2c2a7f21'
  }

  test('renders title and author by default', () => {
    component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'This is a test'
    )

    const element = component.getAllByText(
      'author test'
    )
    expect(element).toBeDefined()
    const details = component.container.querySelector('.details')
    expect(details).toHaveStyle('display:none')


  })

  test('when button clicked renders url and likes', () => {
    component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const details = component.container.querySelector('.details')
    expect(details).not.toHaveStyle('display:none')
    const url = component.getByText('test url' )
    expect(url).toBeDefined()
    const likes = component.container.querySelector('.likes')
    expect(likes).toBeDefined()

  })

  test('check like handler is called', () => {
    const handleLikeBlog = jest.fn()
    component = render(
      <Blog blog={blog} handleLikeBlog={handleLikeBlog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLikeBlog.mock.calls).toHaveLength(2)

  })
})

