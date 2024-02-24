import { Field } from '../Field'
import '../Form.css'
import '../Modal/Modal.css'
import { useState } from 'react'
import productServices from '../../../services/Product'

const ModalCreateProducts = ({ handleClose, user }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  // useEffect(() => {
  //   setName(product.name)
  //   setDescription(product.description)
  //   setPrice(product.price)
  //   setStock(product.stock)
  // }, [])

  const handleCreateProduct = async (event) => {
    event.preventDefault()
    console.log('esta creando un producto')

    try {
      console.log('crear producto')
      console.log(name, description, price, stock)
      const newProducto = await productServices.createProduct(user.token, {
        name,
        description,
        price,
        stock
      })
      console.log(newProducto)

      setName('')
      setDescription('')
      setPrice('')
      setStock('')

      handleClose()
    } catch (error) {
      setErrorMessage('error')
      console.log('error ', errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <form onSubmit={handleCreateProduct}>
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
          <button className='form-button'>Crear Producto</button>
        </form>
        <button onClick={handleClose} className='form-button'>Cerrar</button>
      </div>
    </div>
  )
}

export default ModalCreateProducts
