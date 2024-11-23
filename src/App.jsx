import { useState } from 'react'

import './App.css'
import './index.css'


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Compoents/Pages/Register'
import Login from './Compoents/Pages/Login'
import Main from './Compoents/Pages/Main'
import { AccessToken } from './Contexts/User/AuthContext'


function App() {

    const [token , setToken] = useState(null);

  return (
    <BrowserRouter>
     <AccessToken.Provider value={{token , setToken}} >
        <Routes>
            <Route  path='/register' element={<Register />} />
            <Route  path='/login' element={<Login />} />
            <Route index path='' element={<Main />} />
        </Routes>
      </AccessToken.Provider>
    </BrowserRouter>
   
  )
}

export default App
