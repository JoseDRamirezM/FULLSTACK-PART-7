const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('DB cleared')

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('done')
    })

describe('When there are some blogs saved', () => {
    
    test('blogs are returned as json', async() => {
        await api 
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('specific blog is in the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
            'React patterns'
        )
    })
})


describe('Add operations', () => {
    test('A valid blog can be added', async () => {
        const newBlog = {
            title: "test",
            author: "test",
            url: "test",
            likes: 1
        }

        const response = await api
        .post('/api/login')
        .send({ username: "Test", password: "password"})
        .expect(200)
        .expect('Content-Type', /application\/json/)

        //Add the 'bearer' key word
        const token = 'bearer ' + response.body.token
    
        //Post and set the 'Authorization' header 
        await api
            .post('/api/blogs')
            .set( 'Authorization',token )
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

      
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(r => r.title)
      expect(contents).toContain(
          'test'
      )
    })

    test('Blog w/out title and url is not added', async () => {
        const newBlog = {
          likes: 1
        }

        const userLogin = {

            username: "Test",
            password: "password"
        }   

        // Login process
        const response = await api
        .post('/api/login')
        .send(userLogin)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        //Add the 'bearer' key word
        const token = 'bearer ' + response.body.token

        //Post and set the 'Authorization' header 
        await api
          .post('/api/blogs')
          .set( 'Authorization', token)
          .send(newBlog)
          .expect(400)
  
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('If likes property is not given it will be 0 by default', async () => {
        const newBlog = {
            title: "test",
            author: "test",
            url: "test"
        }

        const userLogin = {

            username: "Test",
            password: "password"
        }   

        // Login process
        const loginResponse = await api
        .post('/api/login')
        .send(userLogin)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        //Add the 'bearer' key word
        const token = 'bearer ' + loginResponse.body.token
  
        const response = await api
          .post('/api/blogs')
          .set( 'Authorization', token)
          .send(newBlog)
          .expect(201)

        expect(response.body.likes).toEqual(0)
    })

    test('create op w/out token fails', async () => {
        const newBlog = {
            title: "test",
            author: "test",
            url: "test",
            likes: 1
        }

            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
     
    })
})

describe ('GET and DELETE ops', () => {
    test('Specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('Blog can be deleted', async () => {
        
        const newBlog = {
            title: "test",
            author: "test",
            url: "test"
        }

        const userLogin = {

            username: "Test",
            password: "password"
        }   

        // Login process
        const loginResponse = await api
        .post('/api/login')
        .send(userLogin)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        //Add the 'bearer' key word
        const token = 'bearer ' + loginResponse.body.token
  
        const response = await api
          .post('/api/blogs')
          .set( 'Authorization', token)
          .send(newBlog)
          .expect(201)

        const blogsAtStart = await helper.blogsInDb()

        await api
            .delete(`/api/blogs/${response.body.id}`)
            .set('Authorization', token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length - 1
        )

        const title = blogsAtEnd.map(r => r.title)

        expect(title).not.toContain(response.body.title)
    })
})

describe('Identifier', () => {
    test('Verify identifier is named id', async () => {
        const blogs = await helper.blogsInDb()
        const ids = blogs.map( blog => blog.id)
        expect(ids).toBeDefined()
    })
})

describe('update', () => {
    test('Verify likes update successfully', async () => {
        const response = await api
                                .get('/api/blogs')
                                .expect(200)
                                .expect('Content-Type', /application\/json/)
        
        const initialBlog = response.body[0]
        const update = {
            likes: (initialBlog.likes) + 1
        }
        const updateResponse = await api
                                    .put(`/api/blogs/${initialBlog.id}`)
                                    .send(update)
                                    .expect(200)
                                    .expect('Content-Type', /application\/json/)
        
        const updatedBlog = updateResponse.body

        expect(initialBlog.likes).toEqual(updatedBlog.likes - 1)
    })

})

afterAll(() => {
    mongoose.connection.close()
})