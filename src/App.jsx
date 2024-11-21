import { useState } from 'react'

import './App.css'
import './index.css'

import Logo from './Compoents/Layout/Logo'
import ChatsList from './Compoents/Layout/ChatsList'
import CurrentChat from './Compoents/Layout/CurrentChat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Compoents/Pages/Register'
import Login from './Compoents/Pages/Login'
import Main from './Compoents/Pages/Main'

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/register' element={<Register />} />
        <Route  path='/login' element={<Login />} />
        <Route index path='' element={<Main />} />
        
       
   
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
