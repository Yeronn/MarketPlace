import { useEffect, useState } from 'react'
import './createAccount.css'
import MessageCreateAccount from './MessageCreateAccount'
import AccountRequirements from './AccountRequirements'
import { XIcon } from '../../icons'
import loginService from './../../../services/login'

export default function CreateAccount ({ handleShowInterface }) {
  const [showCreateAccount, setShowCreateAccount] = useState(false)

  const [showModalAssignData, setShowModalAssignData] = useState()
  const [requirementType, setShowRequirementType] = useState('')
  const [requirementValue, setRequirementValue] = useState('')
  const [requirementName, setRequirementName] = useState('')

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const [showRequirementValue, setShowRequirementValue] = useState()

  const [fadeBackground, setFadeBackground] = useState(true)
  const fadeBackgroundTag = fadeBackground ? 'fade-background' : ''

  useEffect(() => {
    setFadeBackground(!fadeBackground)
    if (requirementName === 'email') {
      setShowRequirementValue(email)
    } else if (requirementName === 'name') {
      setShowRequirementValue(name)
    } else if (requirementName === 'username') {
      setShowRequirementValue(username)
    } else if (requirementName === 'phoneNumber') {
      setShowRequirementValue(phoneNumber)
    } else if (requirementName === 'password') {
      // setShowRequirementValue(password)
    } else {
      setShowRequirementValue()
    }
  }, [showModalAssignData])

  const handleShowCreateAccount = () => {
    setShowCreateAccount(!showCreateAccount)
  }

  const addRequirement = (text, type, name) => {
    setShowModalAssignData(text)
    setShowRequirementType(type)
    setRequirementName(name)
  }

  const handleAssignData = (event) => {
    event.preventDefault()
    if (requirementValue) {
      if (requirementName === 'email') {
        setEmail(requirementValue)
      } else if (requirementName === 'name') {
        setName(requirementValue)
      } else if (requirementName === 'username') {
        setUsername(requirementValue)
      } else if (requirementName === 'phoneNumber') {
        setPhoneNumber(requirementValue)
      } else if (requirementName === 'password') {
        setPassword(requirementValue)
      } else {
        console.log('nada')
      }
      setShowModalAssignData()
      setRequirementName('')
      setRequirementValue('')
      setShowRequirementType('')
    } else {
      console.log('No puedes dejar el campo vacio')
    }
  }

  const handleCloseModal = () => {
    setShowModalAssignData()
    setRequirementName('')
    setRequirementValue('')
    setShowRequirementType('')
  }

  const handleCreateUser = async () => {
    console.log('inicio de crear usuario')
    try {
      if (email && name && username && phoneNumber && password) {
        const newUser = await loginService.createUser({
          email,
          name,
          username,
          phoneNumber,
          password
        })
        console.log(newUser)
        handleShowInterface('LoginInterface')
      } else {
        console.log('faltan datos para crear la cuenta')
      }
    } catch (error) {
      console.log('Hubo un error: ', error)
    }
  }

  const handleShowLogin = () => {
    handleShowInterface('LoginInterface')
  }

  return (
    <section>
      <div className={`create-account ${fadeBackgroundTag}`}>
        {!showCreateAccount &&
          <MessageCreateAccount />}
        {!showCreateAccount &&
          <button className='create-account--btn' onClick={handleShowCreateAccount}>Crear cuenta</button>}
        {showCreateAccount &&
          <AccountRequirements addRequirement={addRequirement} fadeBackground={fadeBackground} />}
        {showCreateAccount &&
          <button className='create-account--btn' onClick={handleCreateUser}>Crear Cuenta</button>}
        <span onClick={handleShowLogin}>Iniciar sesion</span>
      </div>
      {showModalAssignData &&
        <div className='modal-container'>
          <span className='close-modal' onClick={handleCloseModal}><XIcon /></span>
          <form className='modal-assign-data' onSubmit={handleAssignData}>
            <label>
              <h1>Ingresa tu {showModalAssignData}</h1>
              {showRequirementValue &&
                <p>{showModalAssignData} ingresado: {showRequirementValue}</p>}
              <input
                type={requirementType}
                value={requirementValue}
                name={requirementName}
                onChange={({ target }) => setRequirementValue(target.value)}
              />
            </label>
            <button className='requirement-modal--btn'>Continuar</button>
          </form>
        </div>}
    </section>
  )
}
