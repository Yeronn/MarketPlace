import './Form.css'
import { Field } from './Field'
import loginService from '../../services/Login'
import { useState } from 'react'

export const CreateUser = ({ handleShowCreateAccount }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const handleCreateUser = async (event) => {
    event.preventDefault()
    console.log('esta creando usuario')

    try {
      console.log('crear usuario')
      const newUser = await loginService.createUser({
        name,
        username,
        phoneNumber,
        email,
        password
      })
      console.log(newUser)

      setName('')
      setUsername('')
      setPassword('')
      setPhoneNumber('')
      setEmail('')
    } catch (error) {
      setErrorMessage('error')
      console.log('error ', errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (

    <div className='square'>
      <form onSubmit={handleCreateUser}>
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
          spanChildren='Contraseña'
          inputType='password'
          inputplaceholder='Contraseña'
          inputValue={password}
          inputName='password'
          inputOnChange={({ target }) => setPassword(target.value)}
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
        <button className='form-button'>Crear cuenta</button>
      </form>
      <button onClick={handleShowCreateAccount} className='form-button'>Cerrar</button>
    </div>
  )
}
