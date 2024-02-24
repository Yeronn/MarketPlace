import { useState } from 'react'
import './Form.css'
import AdminNav from './Nav/AdminNav'
import UserTable from './UserTable/UserTable'
import ProductsTable from './ProductsTable/ProductsTable'

export const MainPage = ({ handleChangeUser, user }) => {
  const [userLogged, setUserLogged] = useState(user)
  const [showUserTable, setShowUserTable] = useState(true)
  const [showProductsTable, setShowProductsTable] = useState(false)

  const handleUserLogged = (dataUpdateUser) => {
    const updatedUser = { ...user }
    updatedUser.name = dataUpdateUser.name
    updatedUser.username = dataUpdateUser.username
    setUserLogged(updatedUser)
  }

  const handleShowUserTable = (stateUser) => {
    setShowUserTable(stateUser)
  }

  const handleShowProductsTable = (state) => {
    setShowProductsTable(state)
  }

  return (
    <section>
      <AdminNav
        handleChangeUser={handleChangeUser}
        user={userLogged}
        handleShowUserTable={handleShowUserTable}
        handleShowProductsTable={handleShowProductsTable}
      />
      {showUserTable &&
        <UserTable
          userLogged={userLogged}
          handleUserLogged={handleUserLogged}
          handleChangeUser={handleChangeUser}
        />}
      {showProductsTable && <ProductsTable user={userLogged} />}
    </section>
  )
}
