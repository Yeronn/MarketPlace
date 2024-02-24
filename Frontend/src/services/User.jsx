import axios from 'axios'

// const baseUrlUser = 'https://api-rest-marketplace.onrender.com/api'
const baseUrlUser = 'http://localhost:8080/api'

const getAllUsers = async (token) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlUser + '/users', config)
  return data
}

const getUser = async (token, userId) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlUser + '/user/' + userId, config)
  return data
}

const updateUser = async (token, userUpdateData) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(baseUrlUser + '/user/' + userUpdateData.id, userUpdateData, config)
  return data
}

const deleteUser = async (token, userId) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.delete(baseUrlUser + '/user/' + userId, config)
  return data
}

export default { getAllUsers, getUser, deleteUser, updateUser }
