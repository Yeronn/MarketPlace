import { UserCircleIcon } from '../../icons'
import './submenu.css'

export default function UserCardOptions ({ handleShowInterface, handleShowMenu, handleShowUserOption }) {
  const handleShowLogin = () => {
    handleShowInterface('LoginInterface')
    handleShowMenu()
    handleShowUserOption()
  }

  const handleShowCreateAccount = () => {
    handleShowInterface('CreateAccountInterface')
    handleShowMenu()
    handleShowUserOption()
  }
  return (
    <section className='user-card-options-menu'>
      <div className='user-card-options-menu-message'>
        <span><UserCircleIcon /></span>
        <div>
          <h4>Bienvenido</h4>
          <p>Ingresa a tu cuenta para ver tus compras</p>
        </div>
      </div>
      <div className='user-card-options-menu-btn'>
        <button className='btn-login' onClick={handleShowLogin}>Ingresa</button>
        <button className='btn-create-account' onClick={handleShowCreateAccount}>Crea tu cuenta</button>
      </div>
    </section>
  )
}
