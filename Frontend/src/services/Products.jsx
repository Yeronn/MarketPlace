import axios from 'axios'

const baseUrlProducts = 'http://localhost:8080/api/products'

const getAllProducts = async (token) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlProducts, config)
  return data
}

const getAllProductsByUser = async (token) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlProducts + '/user', config)
  return data
}

const getProductsByCategory = async (token, idCategory) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlProducts + '/category', idCategory, config)
  return data
}

const getSoldProducts = async (token) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(baseUrlProducts + '/sold', config)
  return data
}

const createProduct = async (token, newProduct) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = await axios.post(baseUrlProducts, newProduct, config)
  return request.data
}

const updateProduct = async (token, productUpdateData) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(baseUrlProducts + '/' + productUpdateData.id, productUpdateData, config)
  return data
}

const updateProductImage = async (token, productUpdateData, idProduct) => {
  const config = {
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(baseUrlProducts + '/image/' + idProduct, productUpdateData, config)
  return data
}

// const deleteProduct = async (token, productId) => {
//   const config = {
//     credentials: 'same-origin',
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
//   const { data } = await axios.delete(baseUrlProducts + '/' + productId, config)
//   return data
// }

export default { getAllProducts, getAllProductsByUser, getProductsByCategory, getSoldProducts, createProduct, updateProduct, updateProductImage }
