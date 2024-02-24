import axios from 'axios'

// const baseUrlAuth = 'https://api-rest-marketplace.onrender.com/auth'
const baseUrlAuth = 'http://localhost:8080/auth'

const login = async credentials => {
  const { data } = await axios.post(baseUrlAuth + '/login', credentials)
  return data
}

const createUser = async (newUser) => {
  const request = await axios.post(baseUrlAuth + '/register', newUser)
  return request.data
}

export default { login, createUser }
