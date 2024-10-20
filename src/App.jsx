import { useState } from 'react'

import './App.css'
import Logo from './Compoents/Layout/Logo'
import ChatsList from './Compoents/Layout/ChatsList'
import CurrentChat from './Compoents/Layout/CurrentChat'

function App() {
  

  return (
    <>
        <Logo />
        <ChatsList />
        <CurrentChat />
    </>
  )
}

export default App
