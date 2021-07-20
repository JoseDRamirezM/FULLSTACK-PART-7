import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get_user_by_id = id => {
  const request = axios.get(baseUrl + `/${id}`)
  return request.then(response => response.data)
}

export default { getAll, get_user_by_id }