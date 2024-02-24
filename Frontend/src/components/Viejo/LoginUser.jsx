import { useState } from 'react'
import { UserIcon, PadLockIcon } from './icons'
import loginService from '../../services/Login'
import { Field } from './Field'

export function LoginUser ({ handleChangeUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        email,
        password
      })
      console.log(user)
      handleChangeUser(user)
      setEmail('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Credenciales incorrectas')
      console.log(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Field
        spanChildren={<UserIcon />}
        inputType='email'
        inputplaceholder='Correo'
        inputValue={email}
        inputName='email'
        inputOnChange={({ target }) => setEmail(target.value)}
      />

      <Field
        spanChildren={<PadLockIcon />}
        inputType='password'
        inputplaceholder='Password'
        inputValue={password}
        inputName='password'
        inputOnChange={({ target }) => setPassword(target.value)}
      />
      <button className='form-button'>Ingresar</button>
    </form>
  )
}
