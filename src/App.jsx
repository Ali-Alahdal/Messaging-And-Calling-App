import { useState } from 'react'

import './App.css'
import Logo from './Compoents/Layout/Logo'
import ChatsList from './Compoents/Layout/ChatsList'
import CurrentChat from './Compoents/Layout/CurrentChat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Compoents/Pages/Register'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/register' element={<Register />} />
        <Route index path='' 
        element={<>
          <Logo />
          <ChatsList />
          <CurrentChat />
          </>} />
        
       
   
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
