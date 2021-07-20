const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
                        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
  
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  if (!request.user) {
    response.status(401).json({ error: "token missing or invalid" }).end()
  }

  const user = request.user
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  await blog.populate('user', {username: 1, name: 1}).execPopulate();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor , async (request, response) => {
  if (!request.user) {
    response.status(401).json({ error: "token missing or invalid" }).end()
  }

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).json({
      error: 'Only the user that created the blog is allowed to delete it'
    }).end()
  }

  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog
                            .findByIdAndUpdate(request.params.id, blog, {new : true})
                            .populate('user', {username: 1, name: 1})

  response.json(updatedBlog).status(200)
})

module.exports = blogsRouter