import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main className="home-main-content">
        <div className="home-header-section">
          <div className="home-header-text">
            <h1>Evan Patrick</h1>
            <h1>Software Engineer, Web Developer</h1>
          </div>
          <div className="profile-image">
            <img src="/src/assets/ProfessionalHeadShot.jfif" alt="Evan Patrick Professional Headshot" />
          </div>
          <div className="social-media-section">
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/linkedIn.png" alt="LinkedIn" className="social-icon" />
            </a>
            <a href="https://github.com/EvanPatrick423" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/gitHubLogo.png" alt="GitHub" className="social-icon" />
            </a>
          </div>
        </div>
        <div className="card">
          <div>

          </div>
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
