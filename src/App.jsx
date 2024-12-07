import { useState } from 'react'

import './App.css'
import './index.css'


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Compoents/Pages/Register'
import Login from './Compoents/Pages/Login'
import Main from './Compoents/Pages/Main'
import { UserId , Username } from './Contexts/User/UserContext'

function App() {

    const [userId , setUserId] = useState();
    const [username , setUsername] = useState();

  return (
    <BrowserRouter>

        <UserId.Provider value={{userId , setUserId}} >
        <Username.Provider value={{username , setUsername}} >

          <Routes>
              <Route  path='/register' element={<Register />} />
              <Route  path='/login' element={<Login />} />
              <Route index path='' element={<Main />} />
          </Routes>

        </Username.Provider>
        </UserId.Provider>
    </BrowserRouter>
   
  )
}

export default App
