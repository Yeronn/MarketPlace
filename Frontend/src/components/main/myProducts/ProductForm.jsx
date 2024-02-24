import { useEffect, useState } from 'react'
import './ProductForm.css'
import productServices from '../../../services/Products'

export default function ProductForm ({ hiddenCreateProduct, token, categoryOptions, updateProductsInformation, isCreateProduct, selectedProduct }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [idCategory, setIdCategory] = useState('')
  const [imageFile, setImageFile] = useState('')

  const btnTag = isCreateProduct ? 'Crear producto' : 'Editar producto'

  useEffect(() => {
    if (!isCreateProduct) {
      setName(selectedProduct.name)
      setPrice(selectedProduct.price)
      setStock(selectedProduct.stock)
      setDescription(selectedProduct.description)
      setIdCategory(selectedProduct.category.id)
    }
  }, [])

  const checkPrice = (priceInput) => {
    if (isNaN(priceInput)) {
      // TODO: Hacer modal que advierta que solo se permiten numeros en el nit
      console.log('EL precio solo puede contener numeros')
    } else {
      if (priceInput >= 0) {
        setPrice(priceInput)
      }
    }
  }

  const checkStock = (stockInput) => {
    if (isNaN(stockInput)) {
      // TODO: Hacer modal que advierta que solo se permiten numeros en el nit
      console.log('La cantidad solo puede contener numeros')
    } else {
      if (stockInput >= 0) {
        setStock(stockInput)
      } else {
        console.log('no se permiten numeros negativos')
      }
    }
  }

  const handleImagenChange = (event) => {
    // Actualizar el estado de la imagen al seleccionar un archivo
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isCreateProduct) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('stock', stock)
      formData.append('description', description)
      formData.append('idCategory', idCategory)
      formData.append('imageFile', imageFile)

      try {
        const newProduct = await productServices.createProduct(token, formData)
        console.log(newProduct)
        updateProductsInformation()
        hiddenCreateProduct()
      } catch (error) {
        console.log('Ocurrio un error al crear el producto: ', error)
      }
    } else {
      try {
        const id = selectedProduct.id
        const editedProduct = await productServices.updateProduct(token, {
          id,
          name,
          price,
          stock,
          description,
          category: { id: idCategory }
        })
        console.log('Producto actualizado ', editedProduct)
        if (imageFile) {
          const newImage = new FormData()
          newImage.append('imageFile', imageFile)
          const updateProductImage = await productServices.updateProductImage(token, newImage, id)
          console.log('Imagen actualizada: ', updateProductImage)
        }
        updateProductsInformation()
        hiddenCreateProduct()
      } catch (error) {
        console.log('Ocurrio un error al editar el producto: ', error)
      }
    }
  }

  return (
    <div className='create-product'>
      {!isCreateProduct && <h1>Modifica los datos del producto</h1>}
      <form className='create-product--form' onSubmit={handleSubmit}>
        <label className='create-product--label'>
          <span>Nombre del producto</span>
          <input
            type='text'
            value={name}
            name='name'
            onChange={({ target }) => setName(target.value)}
            required
            placeholder={isCreateProduct ? '' : name}
          />
        </label>
        <label className='create-product--label'>
          <span>Precio</span>
          <input
            type='text'
            value={price}
            name='price'
            onChange={({ target }) => checkPrice(target.value)}
            required
          />
        </label>
        <label className='create-product--label'>
          <span>Cantidad</span>
          <input
            type='text'
            value={stock}
            name='stock'
            onChange={({ target }) => checkStock(target.value)}
            required
          />
        </label>
        <label className='create-product--label'>
          <span>Descripción</span>
          <input
            type='text'
            value={description}
            name='description'
            onChange={({ target }) => setDescription(target.value)}
            required
          />
        </label>
        <label className='create-product--label'>
          <span>Categoría</span>
          <select
            value={idCategory}
            name='idCategory'
            onChange={({ target }) => setIdCategory(target.value)}
            required
          >
            <option />
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label className='create-product--label'>
          <span>Imagen</span>
          <input
            type='file'
            id='imageFile'
            name='imageFile'
            onChange={handleImagenChange}
            accept='image/*'
            {... (isCreateProduct ? { required: true } : {})}
          />
        </label>
        <div className='create-product--btn-container'>
          <button onClick={hiddenCreateProduct}>Cancelar</button>
          <button>{btnTag}</button>
        </div>
      </form>
    </div>
  )
}
