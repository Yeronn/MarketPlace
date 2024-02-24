import { useEffect, useState } from 'react'
import './shopping.css'
import SelectedProductCard from '../modals/SelectedProductCard'

export default function Shopping ({ userLogged, myOrders }) {
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedOrder, setSelectedOrder] = useState()

  useEffect(() => {
    console.log('Seleccionando orden', selectedProduct)
  }, [selectedProduct])

  const handleProductClick = (order) => {
    setSelectedProduct(order.detailOrder[0].product)
    setSelectedOrder(order)
  }

  const closeSelectedProduct = () => {
    setSelectedProduct(null)
  }

  return (
    <section className='my-purchased-products'>
      {!selectedProduct &&
        <div className='products-container'>
          {myOrders &&
        myOrders.map((order) => (
          <article className='product-card' key={order.id} onClick={() => handleProductClick(order)}>
            <div className='product-card--image-container'>
              <img src={order.detailOrder[0].product.urlImage} alt='Imagen de la pantalla de un pc' />
            </div>
            <span className='product-card--name my-order-name'>
              {order.detailOrder[0].product.name}
            </span>
            <span className='my-order-date'>Comprado el {order.date.slice(0, 10)}</span>
            <div className='product-card--price'>
              Total: {order.detailOrder[0].total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </div>
          </article>))}
        </div>}

      {selectedProduct &&
        <SelectedProductCard
          userLogged={userLogged}
          selectedProduct={selectedProduct}
          closeSelectedProduct={closeSelectedProduct}
          isOrder
          selectedOrder={selectedOrder}
        />}
    </section>
  )
}
