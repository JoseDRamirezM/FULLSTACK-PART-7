import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (id, blogData) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(baseUrl + `/${id}`, blogData, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(baseUrl + `/${id}`, config)
}

//COMMENT
const comment= async (id, commentData) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl + `/${id}/comments`, commentData, config)
  return response.data
}

export default { getAll, create, setToken, like, remove, comment }