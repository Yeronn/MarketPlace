import './App2.css'
import { LoginUser } from './components/LoginUser'
import { useState, useEffect } from 'react'
import { CreateUser } from './components/CreateUser'
import { WaveImageDown, WaveImageUp } from '../icons'
import { MainPage } from './components/MainPage'

function App () {
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // const storedUser = localStorage.getItem('user')
    const storedUser = 'user'

    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setShowLogin(false)
    }
  }, [])

  const handleShowCreateAccount = () => {
    setShowCreateAccount(!showCreateAccount)
    setShowLogin(!showLogin)
  }

  const handleChangeUser = (newUser) => {
    if (user == null) {
      setUser(newUser)
      // localStorage.setItem('user', JSON.stringify(newUser))
      console.log('Inicio de sesión exitoso:', newUser)
    } else {
      setUser(null)
      setShowLogin(true)
      // localStorage.removeItem('user')
      console.log('Cierre de sesión')
    }
  }

  return (
    <div className='page'>
      <header className='header'>
        <WaveImageDown />
      </header>
      <div className='content'>
        <main className='main'>
          <div className='main-content'>
            {(showLogin && user == null) &&
              <section className='sign-in'>
                <LoginUser handleChangeUser={handleChangeUser} />
                <p onClick={handleShowCreateAccount}>Crear cuenta</p>
              </section>}
            {showCreateAccount && <CreateUser handleShowCreateAccount={handleShowCreateAccount} />}
            {user && <MainPage handleChangeUser={handleChangeUser} user={user} />}
          </div>
        </main>
        {/* {role == "admin" && <aside className='aside'>
          <ListUsers userLogged={{ ...user }} />
        </aside>} */}
      </div>

      <footer className='footer'>
        <WaveImageUp />
      </footer>
    </div>
  )
}

export default App
