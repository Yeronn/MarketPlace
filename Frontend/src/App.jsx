import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main'
// import Footer from './components/footer/Footer'
// import Sidebar from './components/sidebar/Sidebar'
import { useEffect, useState } from 'react'

function App () {
  const [user, setUser] = useState(null)
  const [showInterface, setShowInterface] = useState('LoginInterface')
  const [categoryOptions, setCategoryOptions] = useState()
  const [chosenCategory, setChosenCategory] = useState()
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setShowInterface('HomeInterface')
    }
  }, [])

  const handleShowInterface = (interfaceOptionName) => {
    setShowInterface(interfaceOptionName)
  }

  const handleChangeUser = (newUser) => {
    if (user == null) {
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      console.log('Inicio de sesión exitoso:', newUser)
      handleShowInterface('HomeInterface')
    } else {
      setUser(null)
      localStorage.removeItem('user')
      console.log('Cierre de sesión')
    }
  }

  const handleCategoryOptions = (categories) => {
    setCategoryOptions(categories)
  }

  const handleChosenCategory = (category) => {
    setChosenCategory(category)
  }

  useEffect(() => {
    console.log('Categoria elegida: ', chosenCategory)
  }, [chosenCategory])

  const handlePageLoaded = (pageLoadedValue) => {
    setPageLoaded(pageLoadedValue)
  }
  return (
    <div className='app'>
      <Header
        handleShowInterface={handleShowInterface}
        user={user}
        handleChangeUser={handleChangeUser}
        handleCategoryOptions={handleCategoryOptions}
        pageLoaded={pageLoaded}
        handleChosenCategory={handleChosenCategory}
      />
      <Main
        showInterface={showInterface}
        handleShowInterface={handleShowInterface}
        userLogged={user}
        handleChangeUser={handleChangeUser}
        categoryOptions={categoryOptions}
        handlePageLoaded={handlePageLoaded}
        chosenCategory={chosenCategory}
      />
      {/* <Sidebar /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default App
