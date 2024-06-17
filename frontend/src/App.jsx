import { useState } from 'react'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Login />
    <Registration />
  )
}

export default App
