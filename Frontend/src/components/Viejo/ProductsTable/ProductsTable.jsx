import React, { useState, useEffect } from 'react'
import productsServices from '../../../services/Product'
import ModalProducts from './ModalProducts'
// import userServices from '../../services/User'
import './ProductsTable.css'
import ModalCreateProducts from './ModalCreateProducts'

const ProductsTable = ({ user }) => {
  const [products, setProducts] = useState([])
  const [selectedProductUpdate, setSelectedProductUpdate] = useState(null)
  const [selectedProductDelete, setSelectedProductDelete] = useState(null)
  const [isCreatingProduct, setIsCreatingProduct] = useState(false)

  useEffect(() => {
    async function fetchData () {
      const data = await productsServices.getAllProducts(user.token)
      setProducts(data)
    }
    fetchData()
  }, [products])

  const handleClickUpdate = (product) => {
    setSelectedProductUpdate(product)
  }

  const handleUpdateProduct = async (updateProduct) => {
    console.log('antes de actualizar el producto en BD ', updateProduct)
    try {
      console.log('actualizando producto')
      const productUpdate = await productsServices.updateProduct(user.token, updateProduct)
      handleCloseModal()
      console.log('producto actualizado: ', productUpdate)
    } catch (error) {
      console.log('error al actualizar el producto', error)
    }
  }

  const handleClickDelete = (product) => {
    setSelectedProductDelete(product)
  }

  const handleDeleteProduct = async () => {
    try {
      await productsServices.deleteProduct(user.token, selectedProductDelete.id)
      const updatedProducts = products.filter(product => product.id !== selectedProductDelete.id)
      setProducts(updatedProducts)
      setSelectedProductDelete(null)
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
    }
  }

  // const handleGetUser = async (userId) => {
  //   try {
  //     console.log(userId)
  //     const userProduct = await userServices.getUser(user.token, userId)
  //     console.log(userProduct)
  //     return userProduct.name
  //   } catch (error) {
  //     console.log('Ocurrió un error: ', error)
  //   }
  // }

  const handleCloseModal = () => {
    setSelectedProductUpdate(null)
    setSelectedProductDelete(null)
  }

  // Función para abrir el modal de creación de producto
  const handleOpenCreateProductModal = () => {
    setIsCreatingProduct(true)
  }

  // Función para cerrar el modal de creación de producto
  const handleCloseCreateProductModal = () => {
    setIsCreatingProduct(false)
  }

  // const handleCreateProduct = async (newProduct) => {
  //   try {
  //     const createdProduct = await productsServices.createProduct(user.token, newProduct)
  //     setProducts([...products, createdProduct])
  //     handleCloseCreateProductModal()
  //   } catch (error) {
  //     console.error('Error al crear el producto:', error)
  //   }
  // }

  return (
    <div className='user-table-container'>
      <button className='create-product-button' onClick={handleOpenCreateProductModal}>Crear Producto</button>

      <table className='user-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
              <td>{product.stock}</td>
              <td>{product.userId}</td>
              <td>
                {(user.role === 'admin' || user.id === product.userId) &&
                  <button onClick={() => handleClickUpdate(product)}>Actualizar</button>}
                {(user.role === 'admin' || user.id === product.userId) &&
                  <button onClick={() => handleClickDelete(product)}>Eliminar</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreatingProduct && (
        <ModalCreateProducts
          handleClose={handleCloseCreateProductModal}
          token={user}
        />
      )}

      {(selectedProductDelete || selectedProductUpdate) && (
        <ModalProducts
          product={selectedProductDelete ?? selectedProductUpdate}
          handleClose={handleCloseModal}
          handleFunction={selectedProductDelete ? handleDeleteProduct : handleUpdateProduct}
          isDelete={!!selectedProductDelete}
        />
      )}
    </div>
  )
}

export default ProductsTable
