import './home.css'
// import productsServices from './../../../services/Products'
import { useState } from 'react'
import SelectedProductCard from '../modals/SelectedProductCard'

export default function Home ({ userLogged, productsData, updateProductsInformation }) {
  const price2 = 234234
  const [selectedProduct, setSelectedProduct] = useState()

  const [fadeBackground, setFadeBackground] = useState(false)
  const fadeBackgroundTag = fadeBackground ? 'fade-background' : ''

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setFadeBackground(true)
  }

  const closeSelectedProduct = () => {
    setSelectedProduct(null)
    setFadeBackground(false)
  }

  return (
    <section className='home'>
      {!selectedProduct &&
        <div className={`products-container ${fadeBackgroundTag}`}>
          {productsData &&
      productsData.map((product) => (
        <article className='product-card' key={product.id} onClick={() => handleProductClick(product)}>
          <div className='product-card--image-container'><img src={product.urlImage} alt='Imagen de la pantalla de un pc' /></div>
          <div className='product-card--price'>{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
          <span className='product-card--name'>{product.name}</span>
          <span className='product-card--seller'>Vendido por {product.user.username}</span>
        </article>
      )
      )}
          <article className='product-card'>
            <div className='product-card--image-container'>Imagen</div>
            <div className='product-card--price'>{price2.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
            <span className='product-card--name'>Silla Escritorio Esgonomica Oficina de color negro</span>
            <span className='product-card--seller'>Vendido por</span>
          </article>

          <article className='product-card'>
            <div className='product-card--image-container'>Imagen</div>
            <div className='product-card--price'>{price2.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
            <span className='product-card--name'>Silla Escritorio Esgonomica Oficina de color negro</span>
            <span className='product-card--seller'>Vendido por</span>
          </article>
        </div>}
      {selectedProduct &&
        <SelectedProductCard
          userLogged={userLogged}
          selectedProduct={selectedProduct}
          closeSelectedProduct={closeSelectedProduct}
          updateProductsInformation={updateProductsInformation}
        />}
    </section>
  )
}
