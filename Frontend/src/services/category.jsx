import axios from 'axios'

const baseUrlProducts = 'http://localhost:8080/api'

const getCategories = async (token) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlProducts + '/categories', config)
  return data
}

export default { getCategories }
