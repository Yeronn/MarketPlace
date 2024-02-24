import { useEffect, useState } from 'react'
import './Form.css'
import userServices from '../../services/User'
import { SettingsIcon } from './icons'

export const ListUsers = ({ userLogged }) => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const usuarios = await userServices.getAllUsers(userLogged.token)
      console.log(usuarios)
      setUsers(usuarios)
    }
    fetchData()
  }, [])

  return (
    <div className='square listUsers'>
      {users && users.map((user) => (
        <article key={user.id} className='square userCard'>
          <h3>{user.name}</h3>
          <p>{user.username}</p>
          {user.role === 'Admin' && <span className='userCard--config icons'><SettingsIcon /></span>}
        </article>
      )
      )}
    </div>
  )
}
