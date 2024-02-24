import './header.css'
import { useEffect, useState } from 'react'
import Navbar from './navbar/Navbar'
// import UserCardOptions from './submenu/UserCardOptions'
import SubMenuOptions from './submenu/SubMenuOptions'
import services from '../../services/category'

const Header = ({ handleShowInterface, user, handleChangeUser, handleCategoryOptions, pageLoaded, handleChosenCategory }) => {
  const [showSubMenu, setShowSubMenu] = useState(false)

  const [categories, setCategories] = useState()

  useEffect(() => {
    async function getCategories () {
      try {
        const dataCategories = await services.getCategories(user.token)
        setCategories(dataCategories)
      } catch (error) {
        console.log('Ocurrio un error: ', error)
      }
    }
    if (user) {
      getCategories()
    }
  }, [user])

  useEffect(() => {
    handleCategoryOptions(categories)
  }, [categories])

  const handleShowMenu = () => {
    setShowSubMenu(!showSubMenu)
  }

  return (
    <header className='header'>
      {(user && pageLoaded) &&
        <Navbar
          handleShowMenu={handleShowMenu}
          showSubMenu={showSubMenu}
          handleShowInterface={handleShowInterface}
        />}

      {showSubMenu &&
        <div className='nav-submenu'>
          {/* {!user &&
            <UserCardOptions
              handleShowInterface={handleShowInterface}
              handleShowMenu={handleShowMenu}
            />} */}
          {user &&
            <SubMenuOptions
              handleShowInterface={handleShowInterface}
              handleShowMenu={handleShowMenu}
              handleChangeUser={handleChangeUser}
              user={user}
              categories={categories}
              handleChosenCategory={handleChosenCategory}
            />}
        </div>}
    </header>
  )
}

export default Header
