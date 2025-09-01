import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import Homepage from './components/Home/Home'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />
      case 'about':
        return <About />
      case 'projects':
        return <Projects />
      default:
        return <Homepage />
    }
  }

  return (
    <>
      <NavBar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </>
  )
}

export default App
