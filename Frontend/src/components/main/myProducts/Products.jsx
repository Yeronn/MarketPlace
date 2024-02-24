import { useState } from 'react'
import './products.css'
import './../home/home.css'
import SelectedProductCard from '../modals/SelectedProductCard'
import ProductForm from './ProductForm'

export default function Products ({ userLogged, products, categoryOptions, updateProductsInformation }) {
  // const [products, setProducts] = useState()
  const [selectedProduct, setSelectedProduct] = useState()
  const [showCreateProductForm, setShowCreateProductForm] = useState(false)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setShowCreateProductForm(false)
  }

  const closeSelectedProduct = () => {
    setSelectedProduct()
    setShowCreateProductForm(false)
  }

  const showCreateProduct = () => {
    setShowCreateProductForm(true)
    setSelectedProduct(false)
  }

  const hiddenCreateProduct = () => {
    setShowCreateProductForm(false)
    setSelectedProduct(false)
  }

  return (
    <section className='my-products'>
      {(!selectedProduct && !showCreateProductForm) &&
        <button onClick={showCreateProduct}>Crear producto</button>}
      {(!selectedProduct && !showCreateProductForm) &&
        <div className='products-container'>
          {products &&
        products.map((product) => (
          <article className='product-card' key={product.id} onClick={() => handleProductClick(product)}>
            <div className='product-card--image-container'><img src={product.urlImage} alt='Imagen de la pantalla de un pc' /></div>
            <div className='product-card--price'>{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
            <span className='product-card--name'>{product.name}</span>
          </article>
        ))}
        </div>}

      {selectedProduct &&
        <SelectedProductCard
          userLogged={userLogged}
          selectedProduct={selectedProduct}
          closeSelectedProduct={closeSelectedProduct}
          isMyProduct
          categoryOptions={categoryOptions}
          hiddenCreateProduct={hiddenCreateProduct}
          updateProductsInformation={updateProductsInformation}
        />}

      {showCreateProductForm &&
        <ProductForm
          hiddenCreateProduct={hiddenCreateProduct}
          token={userLogged.token}
          categoryOptions={categoryOptions}
          updateProductsInformation={updateProductsInformation}
          isCreateProduct
        />}
    </section>
  )
}
