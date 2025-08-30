import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav-section">
          <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="logo-section">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://graphql.org" target="_blank" rel="noopener noreferrer">
            <div className="logo graphql" alt="GraphQL logo">
              <span>GraphQL</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header 