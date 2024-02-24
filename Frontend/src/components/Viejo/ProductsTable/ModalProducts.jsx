import React, { useEffect, useState } from 'react'
import '../Modal/Modal.css'
import { Field } from '../Field'

const ModalProducts = ({ product, handleClose, handleFunction, isDelete }) => {
  const textButtonFunction = isDelete ? 'Eliminar' : 'Actualizar'

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    setName(product.name)
    setDescription(product.description)
    setPrice(product.price)
    setStock(product.stock)
    setUserId(product.userId)
  }, [])

  const handleUpdate = (event) => {
    event.preventDefault()
    const updatedProduct = {
      id: product.id,
      name,
      description,
      price,
      stock,
      userId
    }
    setName('')
    setDescription('')
    setPrice('')
    setStock('')
    setUserId('')
    handleFunction(updatedProduct)
  }

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        {/* Otras propiedades del usuario aquí */}

        {!isDelete &&
          <div className=''>
            <form onSubmit={handleUpdate}>
              <Field
                spanChildren='Nombre'
                inputType='text'
                inputplaceholder='Nombre'
                inputValue={name}
                inputName='name'
                inputOnChange={({ target }) => setName(target.value)}
              />
              <Field
                spanChildren='Descripcion'
                inputType='text'
                inputplaceholder='Descripcion del producto'
                inputValue={description}
                inputName='description'
                inputOnChange={({ target }) => setDescription(target.value)}
              />
              <Field
                spanChildren='Precio'
                inputType='number'
                inputplaceholder='Precio'
                inputValue={price}
                inputName='price'
                inputOnChange={({ target }) => setPrice(target.value)}
              />
              <Field
                spanChildren='Stock'
                inputType='stock'
                inputplaceholder='Stock'
                inputValue={stock}
                inputName='stock'
                inputOnChange={({ target }) => setStock(target.value)}
              />
              <button className='form-button'>Actualizar</button>
            </form>
          </div>}

        {isDelete && <p>¿Está seguro que desea eliminar el producto {product.name}?</p>}
        <div className='modal-buttons'>
          {isDelete && <button onClick={handleFunction}>{textButtonFunction}</button>}
          <button onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalProducts
