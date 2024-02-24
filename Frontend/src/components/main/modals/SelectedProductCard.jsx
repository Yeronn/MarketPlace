import { useEffect, useState } from 'react'
import { XIcon } from '../../icons'
import './selectedProductCard.css'
import ProductForm from '../myProducts/ProductForm'
import ordersServices from '../../../services/Orders'
import userServices from './../../../services/User'

export default function SelectedProductCard ({ userLogged, selectedProduct, closeSelectedProduct, isMyProduct, categoryOptions, hiddenCreateProduct, updateProductsInformation, isOrder, selectedOrder, isSoldProduct }) {
  const username = (!isMyProduct && !isOrder) ? selectedProduct.user.username : ''
  const [isEditProduct, setIsEditProduct] = useState(false)

  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [amount, setAmount] = useState('0')
  const [total, setTotal] = useState('0')
  const [productOwner, setProductOwner] = useState('')

  useEffect(() => {
    setTotal(amount * selectedProduct.price)
  }, [amount])

  useState(() => {
    console.log(selectedProduct.userId)
    if (isOrder && userLogged && selectedProduct && !isSoldProduct) {
      getProductOwnerOrder(selectedProduct.userId)
    }
  }, [])

  function obtenerFechaActual () {
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0') // Sumar 1 porque los meses van de 0 a 11
    const dia = fecha.getDate().toString().padStart(2, '0')
    return `${año}-${mes}-${dia}`
  }

  const handleCheckAmount = (event) => {
    const inputAmount = event.target.value
    if (!isNaN(inputAmount) && Number.isInteger(Number(inputAmount)) && Number(inputAmount) <= selectedProduct.stock) {
      setAmount(inputAmount)
    } else {
      console.log('Debes ingresar una cantidad valida, entera y menor o igual al stock')
    }
  }

  const handleBuyProduct = async (event) => {
    event.preventDefault()
    if (amount > 0) {
      try {
        const date = obtenerFechaActual()
        const purchaseProductData = {
          date,
          deliveryAddress,
          status: 'Activo',
          detailOrder: [
            {
              idProduct: selectedProduct.id,
              amount,
              total
            }
          ]
        }
        const purchaseProduct = await ordersServices.buyProduct(userLogged.token, purchaseProductData)
        console.log('Producto comprado ', purchaseProduct)
        updateProductsInformation()
        closeSelectedProduct()
      } catch (error) {
        console.log('Ocurrio un error al comprar el producto', error)
      }
    } else {
      console.log('Debe ingresar una cantidad mayor a 0')
    }
  }

  async function getProductOwnerOrder (idUser) {
    const productOwnerData = await userServices.getUser(userLogged.token, idUser)
    console.log(productOwnerData.username)
    setProductOwner(productOwnerData.username)
  }
  return (
    <>
      {!isEditProduct &&
        <article className='selected-product-card purchased-product-card'>
          <span className='close-modal' onClick={closeSelectedProduct}><XIcon /></span>
          <>
            <div className='purchased-title'>
              {(!isMyProduct && !isOrder) && <h2>Producto en Venta</h2>}
              {(isOrder && isSoldProduct) && <h2>Producto Vendido</h2>}
              {(isOrder && !isSoldProduct) && <h2>Producto Adquirido</h2>}
              {isMyProduct && <h2>Mi Producto</h2>}
              <h3>Información del producto</h3>
            </div>
          </>
          <div className='selected-product-card--image-container'><img src={selectedProduct.urlImage} alt='' /></div>
          <span className='selected-product-card--name'>{selectedProduct.name}</span>
          <div className='selected-product-card--price'>{selectedProduct.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
          {!isOrder && <div className='selected-product-card--price'>Stock: {selectedProduct.stock}</div>}
          {(!isMyProduct && !isOrder) &&
            <span className='selected-product-card--seller'>Vendido por {username}</span>}
          {(isOrder && productOwner) &&
            <span className='selected-product-card--seller'>Vendido por {productOwner}</span>}
          <hr />
          <span className='selected-product-card--description-title'>Descripción del producto</span>
          <p className='selected-product-card--description'>Categoría: {selectedProduct.category.name}</p>
          <p className='selected-product-card--description'>{selectedProduct.description}</p>
          <hr />
          {(!isMyProduct && !isOrder) &&
            <form className='selected-product-card--form-container' onSubmit={handleBuyProduct}>
              <label>
                <span>Dirección de entrega: </span>
                <input
                  type='text'
                  value={deliveryAddress}
                  name='deliveryAddress'
                  onChange={({ target }) => setDeliveryAddress(target.value)}
                  required
                />
              </label>
              <label>
                <span>Cantidad: </span>
                <input
                  type='text'
                  value={amount}
                  name='amount'
                  onChange={handleCheckAmount}
                  required
                />
              </label>
              <label>
                <span>Total: </span>
                <span>{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
              </label>
              <button>Comprar</button>
            </form>}
          {(isMyProduct) &&
            <div className='selected-product-card--btn-container'>
              <button onClick={() => { setIsEditProduct(true) }}>Editar</button>
            </div>}
          {isOrder &&
            <div className='purchased-information'>
              {!isSoldProduct &&
                <>
                  <span>Comprado el {selectedOrder.date.slice(0, 10)}</span>
                  <span>Dirección: {selectedOrder.deliveryAddress}</span>
                  <span>Cantidad adquirida del producto: {selectedOrder.detailOrder[0].amount}</span>
                  <span>Total de la compra: {selectedOrder.totalOrder.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                </>}

              {isSoldProduct &&
                <span>Cantidad vendida del producto: {selectedOrder.amount}</span>}
              {isSoldProduct &&
                <span>Total de la venta: {selectedOrder.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>}
            </div>}
        </article>}

      {isEditProduct &&
        <ProductForm
          selectedProduct={selectedProduct}
          hiddenCreateProduct={hiddenCreateProduct}
          token={userLogged.token}
          categoryOptions={categoryOptions}
          updateProductsInformation={updateProductsInformation}
        />}
    </>
  )
}
