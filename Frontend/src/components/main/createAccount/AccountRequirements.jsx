import { EmailIcon, UserIcon, SignatureIcon, PhoneIcon, LockIcon } from '../../icons'

export default function AccountRequirements ({ addRequirement }) {
  const addEmail = () => {
    addRequirement('e-mail', 'email', 'email')
  }
  const addName = () => {
    addRequirement('nombre', 'text', 'name')
  }
  const addUsername = () => {
    addRequirement('nombre de usuario', 'text', 'username')
  }
  const addPhone = () => {
    addRequirement('número de teléfono', 'tel', 'phoneNumber')
  }
  const addPassword = () => {
    addRequirement('contraseña', 'password', 'password')
  }

  return (
    <article className='create-account-requirements'>
      <h1>Completa los datos para crear tu cuenta</h1>
      <ul className='create-account-requirements--container'>
        <li className='requirement-card card-selected'>
          <span className='requirement-card--image-container'><EmailIcon /></span>
          <div>
            <span className='requirement-card--title'>Agrega tu e-mail</span>
            <p className='requirement-card--text'>Recibirás información en tu cuenta</p>
          </div>
          <button className='requirement-card--btn' onClick={addEmail}>Agregar</button>
        </li>
        <li className='requirement-card card-selected'>
          <span className='requirement-card--image-container'><SignatureIcon /></span>
          <div>
            <span className='requirement-card--title'>Elige tu nombre</span>
            <p className='requirement-card--text'>Cuentanos como te llamas</p>
          </div>
          <button className='requirement-card--btn' onClick={addName}>Agregar</button>
        </li>
        <li className='requirement-card card-selected'>
          <span className='requirement-card--image-container'><UserIcon /></span>
          <div>
            <span className='requirement-card--title'>Elige tu nombre de usuario</span>
            <p className='requirement-card--text'>Cómo quieres que te llamen</p>
          </div>
          <button className='requirement-card--btn' onClick={addUsername}>Agregar</button>
        </li>
        <li className='requirement-card card-selected'>
          <span className='requirement-card--image-container'><PhoneIcon /></span>
          <div>
            <span className='requirement-card--title'>Agrega tu número de teléfono</span>
            <p className='requirement-card--text'>Te contactaremos en caso de un incidente</p>
          </div>
          <button className='requirement-card--btn' onClick={addPhone}>Agregar</button>
        </li>
        <li className='requirement-card card-selected'>
          <span className='requirement-card--image-container'><LockIcon /></span>
          <div>
            <span className='requirement-card--title'>Agrega tu contraseña</span>
            <p className='requirement-card--text'>No se la digas a nadie</p>
          </div>
          <button className='requirement-card--btn' onClick={addPassword}>Agregar</button>
        </li>
      </ul>
    </article>
  )
}
