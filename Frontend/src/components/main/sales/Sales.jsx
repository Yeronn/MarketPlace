import { useEffect, useState } from 'react'
import './sales.css'
import SelectedProductCard from '../modals/SelectedProductCard'
export default function Sales ({ userLogged, mySoldProducts }) {
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedSoldProduct, setSelectedSoldProduct] = useState()

  useEffect(() => {
    console.log('Seleccionando orden', selectedProduct)
  }, [selectedProduct])

  const handleProductClick = (soldProduct) => {
    setSelectedProduct(soldProduct.product)
    setSelectedSoldProduct(soldProduct)
  }

  const closeSelectedProduct = () => {
    setSelectedProduct(null)
  }

  return (
    <section className='my-purchased-products'>
      {!selectedProduct &&
        <div className='products-container'>
          {mySoldProducts &&
        mySoldProducts.map((soldProduct) => (
          <article className='product-card' key={soldProduct.id} onClick={() => handleProductClick(soldProduct)}>
            <div className='product-card--image-container'>
              <img src={soldProduct.product.urlImage} alt='Imagen de la pantalla de un pc' />
            </div>
            <span className='product-card--name my-soldProduct-name'>
              {soldProduct.product.name}
            </span>
            {/* <span className='my-soldProduct-date'>Comprado el {soldProduct.date.slice(0, 10)}</span> */}
            <div className='product-card--price'>
              Total: {soldProduct.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </div>
          </article>))}
        </div>}

      {selectedProduct &&
        <SelectedProductCard
          userLogged={userLogged}
          selectedProduct={selectedProduct}
          closeSelectedProduct={closeSelectedProduct}
          isOrder
          selectedOrder={selectedSoldProduct}
          isSoldProduct
        />}
    </section>
  )
}
