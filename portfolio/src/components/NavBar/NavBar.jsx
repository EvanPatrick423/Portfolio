import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './NavBar.css'
import GraphQLLogo from './GraphQLLogo'

function NavBar({ onNavigate, currentPage }) {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav-section">
          <ul className="nav-list">
            <li>
              <button 
                className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => onNavigate('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => onNavigate('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${currentPage === 'projects' ? 'active' : ''}`}
                onClick={() => onNavigate('projects')}
              >
                Projects
              </button>
            </li>
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
            <GraphQLLogo />
          </a>
        </div>
      </div>
    </header>
  )
}

export default NavBar 