import React, { useEffect, useState } from 'react'
import './Modal.css'
import { Field } from '../Field'

const Modal = ({ user, handleClose, handleFunction, isDelete }) => {
  const textButtonFunction = isDelete ? 'Eliminar' : 'Actualizar'

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setName(user.name)
    setUsername(user.username)
    setPhoneNumber(user.phoneNumber)
    setEmail(user.email)
  }, [])

  const handleUpdate = (event) => {
    event.preventDefault()
    const updatedUser = {
      id: user.id,
      name,
      username,
      phoneNumber,
      email
    }
    setName('')
    setUsername('')
    setPhoneNumber('')
    setEmail('')
    handleFunction(updatedUser)
  }

  return (
    <div className='modal-container'>
      <div className='modal-content'>

        {!isDelete &&
          <div className=''>
            <form onSubmit={handleUpdate}>
              <Field
                spanChildren='Nombre'
                inputType='text'
                inputplaceholder='Nombre Completo'
                inputValue={name}
                inputName='name'
                inputOnChange={({ target }) => setName(target.value)}
              />
              <Field
                spanChildren='Nombre de usuario'
                inputType='text'
                inputplaceholder='Nombre de usuario'
                inputValue={username}
                inputName='username'
                inputOnChange={({ target }) => setUsername(target.value)}
              />
              <Field
                spanChildren='Teléfono'
                inputType='tel'
                inputplaceholder='Teléfono'
                inputValue={phoneNumber}
                inputName='phoneNumber'
                inputOnChange={({ target }) => setPhoneNumber(target.value)}
              />
              <Field
                spanChildren='Email'
                inputType='email'
                inputplaceholder='Email'
                inputValue={email}
                inputName='email'
                inputOnChange={({ target }) => setEmail(target.value)}
              />
              <button className='form-button'>Actualizar</button>
            </form>
          </div>}

        {isDelete && <p>¿Está seguro que desea eliminar al usuario {user.username}?</p>}
        <div className='modal-buttons'>
          {isDelete && <button onClick={handleFunction}>{textButtonFunction}</button>}
          <button onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
