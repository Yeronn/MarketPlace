import './AdminNav.css'

const AdminNav = ({ handleChangeUser, user, handleShowUserTable, handleShowProductsTable }) => {
  const showUserTable = () => {
    handleShowUserTable(true)
    handleShowProductsTable(false)
  }

  const showProducts = () => {
    handleShowUserTable(false)
    handleShowProductsTable(true)
  }

  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <span className='user-name'>¡Hola, {user.username}!</span>
        <p className='section-buttons' onClick={showUserTable}>Usuarios</p>
        <p className='section-buttons' onClick={showProducts}>Productos</p>
        {/* Otros enlaces relacionados con el usuario */}
      </div>
      <div className='nav-right' onClick={handleChangeUser}>
        <button className='logout-button'>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  )
}

export default AdminNav
