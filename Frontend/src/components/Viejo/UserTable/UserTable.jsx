import React, { useEffect, useState } from 'react'

import userServices from '../../../services/User'
import './UserTable.css'
import Modal from '../Modal/Modal'

const UserTable = ({ userLogged, handleUserLogged, handleChangeUser }) => {
  const [users, setUsers] = useState([])
  const [selectedUserUpdate, setSelectedUserUpdate] = useState(null)
  const [selectedUserDelete, setSelectedUserDelete] = useState(null)

  useEffect(() => {
    console.log('hola')
    async function fetchData () {
      const data = await userServices.getAllUsers(userLogged.token)
      setUsers(data)
    }
    fetchData()
  }, [])

  const handleClickUpdate = (user) => {
    setSelectedUserUpdate(user)
  }
  const handleUpdateUser = async (updateUser) => {
    console.log('antes de actualizar el usuario en BD ', updateUser)
    try {
      console.log('actualizando usuario')
      const userUpdate = await userServices.updateUser(userLogged.token, updateUser)
      handleCloseModal()
      console.log('usuario actualizado: ', userUpdate)
      let usersUpdated = [...users]
      usersUpdated = usersUpdated.map((user) => {
        if (userUpdate.id === userLogged.id && user.id === userUpdate.id) {
          handleUserLogged(userUpdate)
          return userUpdate
        } else if (user.id === userUpdate.id) {
          return userUpdate
        } else {
          return user
        }
      })
      setUsers(usersUpdated)
    } catch (error) {
      console.log('error al actualizar el usuario', error)
    }
  }

  const handleClickDelete = (user) => {
    setSelectedUserDelete(user)
  }
  const handleDeleteUser = async () => {
    try {
      await userServices.deleteUser(userLogged.token, selectedUserDelete.id)
      const updatedUsers = users.filter(user => user.id !== selectedUserDelete.id)

      verifyDeletedUserIsNotRegistered()

      setUsers(updatedUsers)
      setSelectedUserDelete(null)
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
    }
  }

  const verifyDeletedUserIsNotRegistered = () => {
    const userDeleted = users.find(user => user.id === selectedUserDelete.id)
    if (userDeleted.id === userLogged.id) {
      handleChangeUser()
    }
  }

  const handleCloseModal = () => {
    setSelectedUserUpdate(null)
    setSelectedUserDelete(null)
  }

  return (
    <div className='user-table-container'>
      <table className='user-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>{user.username}</td>
              <td>
                {(userLogged.role === 'admin' || user.id === userLogged.id) &&
                  <button onClick={() => handleClickUpdate(user)}>Actualizar</button>}
                {(userLogged.role === 'admin' || user.id === userLogged.id) &&
                  <button onClick={() => handleClickDelete(user)}>Eliminar</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(selectedUserDelete || selectedUserUpdate) && (
        <Modal
          user={selectedUserDelete ?? selectedUserUpdate}
          handleClose={handleCloseModal}
          handleFunction={selectedUserDelete ? handleDeleteUser : handleUpdateUser}
          isDelete={!!selectedUserDelete}
        />
      )}
    </div>
  )
}

export default UserTable
