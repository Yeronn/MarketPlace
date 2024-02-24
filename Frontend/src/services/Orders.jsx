import axios from 'axios'

const baseUrlProducts = 'http://localhost:8080/api/orders'

const getAllOrdersByUser = async (token) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlProducts + '/user', config)
  return data
}

const buyProduct = async (token, purchaseProduct) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(baseUrlProducts, purchaseProduct, config)
  return data
}

export default { getAllOrdersByUser, buyProduct }
