import React from 'react'
import './Nav.css'

const Nav = ({ handleChangeUser, user }) => {
  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <span className='user-name'>¡Hola, {user.username}!</span>
        <a href='/ventas'>Mis Ventas</a>
        <a href='/pedidos'>Mis Pedidos</a>
        {/* Otros enlaces relacionados con el usuario */}
      </div>
      <div className='nav-right'>
        <button className='logout-button' onClick={handleChangeUser}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  )
}

export default Nav
