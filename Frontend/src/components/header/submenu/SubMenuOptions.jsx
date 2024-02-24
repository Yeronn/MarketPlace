import { ClipBoardListIcon, HomeIcon, SalesIcon, ShoppingBagIcon, UserIcon } from '../../icons'
import './submenu.css'

export default function SubMenuOptions ({ openSubmenu, handleShowInterface, handleShowMenu, handleChangeUser, user, categories, handleChosenCategory }) {
  const handleShowHome = () => {
    handleShowInterface('HomeInterface')
    handleShowMenu()
  }
  const handleShowMyShopping = () => {
    handleShowInterface('MyShoppingInterface')
    handleShowMenu()
  }
  const handleMySales = () => {
    handleShowInterface('MySalesInterface')
    handleShowMenu()
  }
  const handleShowMyProducts = () => {
    handleShowInterface('MyProductsInterface')
    handleShowMenu()
  }
  const handleLogOut = () => {
    handleShowInterface('LoginInterface')
    handleChangeUser()
    handleShowMenu()
  }
  const handleChooseCategory = (category) => {
    handleShowInterface('CategoryInterface')
    handleChosenCategory(category)
    handleShowMenu()
  }
  return (
    <ul className={`nav-submenu-options ${openSubmenu}`}>
      <li className='submenu-option-card' onClick={handleShowHome}>
        <span><HomeIcon /></span>
        <p>Inicio</p>
      </li>
      <li className='submenu-option-card' onClick={handleShowMyShopping}>
        <span><ShoppingBagIcon /></span>
        <p>Mis compras</p>
      </li>
      <li className='submenu-option-card' onClick={handleMySales}>
        <span><SalesIcon /></span>
        <p>Mis ventas</p>
      </li>
      <li className='submenu-option-card' onClick={handleShowMyProducts}>
        <span><ClipBoardListIcon /></span>
        <p>Mis productos</p>
      </li>
      <li className='submenu-option-card' onClick={handleLogOut}>
        <span><UserIcon /></span>
        <p>Cerrar sesión</p>
      </li>
      <hr />
      <span className='categories-title'>Categorias</span>
      {categories &&
      categories.map((category) => (
        <li className='submenu-option-card' key={category.id} onClick={() => handleChooseCategory(category.id)}>
          <span><UserIcon /></span>
          <p>{category.name}</p>
        </li>
      ))}
    </ul>
  )
}
