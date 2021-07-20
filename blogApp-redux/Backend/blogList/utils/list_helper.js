const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum , blog) => {
        return sum + blog["likes"]
    }, 0)

    return total
}

const favouriteBlog = (blogs) => {
    const likes = blogs.map(blog => {
        return blog["likes"]
    })
    const max = Math.max(...likes)
    const max_index = likes.indexOf(max)
    return blogs[max_index]
}
 


const max = require('lodash/max')
const countBy = require('lodash/countby')
const groupBy = require('lodash/groupby')

const mostBlogs = (blogs)  => {
    const count_author_blogs = countBy(blogs, 'author') 
    const most = Object.keys(count_author_blogs).reduce((actual, next) => count_author_blogs[actual] > count_author_blogs[next] ? actual : next)
    return ({
        author: most,
        blogs: count_author_blogs[most]
    })
}

const mostLikes = (blogs)  => {
    const reducer = ( likes, authors) => {
        for (author in authors) {
            const value = authors[author].reduce((sum, blog) => {
                return sum + blog.likes
            }, 0)
    
            likes.push(value)
        }
        return likes
    }
    const authors = groupBy(blogs, 'author')
    const blogLikes = reducer([], authors)
    const authorsKeys = Object.keys(authors)
    const result = Object.assign(...authorsKeys.map((author, i) => (
            { [author] : blogLikes[i] }
    )))
    const maxKey = Object.keys(result).reduce((actual, next) => result[actual] > result[next] ? actual : next)
    return ( 
        {
            author : maxKey,
            likes: result[maxKey]
        }
    )
}

const listWithOneBlog = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }  
]

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}