import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import Homepage from './components/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Homepage />
    </>
  )
}

export default App
