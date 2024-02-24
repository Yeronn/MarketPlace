import { useState } from 'react'
import loginService from './../../../services/login'
import './login.css'

export default function Login ({ handleChangeUser, handleShowInterface }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Iniciando sesion')
    try {
      const user = await loginService.login({
        email,
        password
      })
      handleChangeUser(user)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log('Ha ocurrido un error: ', error)
    }
  }

  const handleShowCreateAccount = () => {
    handleShowInterface('CreateAccountInterface')
  }

  return (
    <section className='login'>
      <h1>Hola! Ingresa tu e-mail y Contraseña</h1>
      <form className='login-form' onSubmit={handleLogin}>
        <label>
          <span>E-mail</span>
          <input type='email' value={email} name='email' className='login-form-box' onChange={({ target }) => setEmail(target.value)} />
        </label>
        <label>
          <span>Contraseña</span>
          <input type='password' value={password} name='password' className='login-form-box' onChange={({ target }) => setPassword(target.value)} />
        </label>
        <button className='login-form-box'>Iniciar sesión</button>
      </form>
      <span onClick={handleShowCreateAccount}>Crear cuenta</span>
    </section>
  )
}
