import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="header-section">
          <div className="header-text">
            <h1>Evan Patrick</h1>
            <h1>Software Engineer, Web Developer</h1>
          </div>
          <div className="profile-image">
            <img src="/src/assets/ProfessionalHeadShot.jfif" alt="Evan Patrick Professional Headshot" />
          </div>
        </div>
        <div className="card">
          {/* <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>*/}
        </div> 
        
      </main>
    </>
  )
}

export default App
