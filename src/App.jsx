import { useState } from 'react'

import './App.css'
import './index.css'


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Compoents/Pages/Register'
import Login from './Compoents/Pages/Login'
import Main from './Compoents/Pages/Main'
import ProtectedRoute from './Compoents/Parts/ProtectedRoute'
import PublicRoute from './Compoents/Parts/PublicRoute'
import { UserId, Username } from './Contexts/User/UserContext'
import { CurrentChat, CurrentReceiver } from './Contexts/Chats/CureentChatContext'

function App() {

  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [currentReceiver, setCurrentReceiver] = useState();

  return (
    <BrowserRouter>

      <UserId.Provider value={{ userId, setUserId }} >
        <Username.Provider value={{ username, setUsername }} >
          <CurrentReceiver.Provider value={{ currentReceiver, setCurrentReceiver }}>

            <Routes>
              <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route index path='' element={<ProtectedRoute><Main /></ProtectedRoute>} />

            </Routes>
          </CurrentReceiver.Provider>
        </Username.Provider>
      </UserId.Provider>
    </BrowserRouter>

  )
}

export default App
