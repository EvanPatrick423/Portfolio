'use client';

import './NavBar.css';
import NextJsLogo from './NextJsLogo';
import ReactLogo from './ReactLogo';
import GraphQLLogo from './GraphQLLogo';
import ApolloLogo from './ApolloLogo';

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
            <li>
              <button 
                className={`nav-button ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => onNavigate('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        <div className="logo-section">
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
            <NextJsLogo />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <ReactLogo />
          </a>
          <a href="https://graphql.org" target="_blank" rel="noopener noreferrer">
            <GraphQLLogo />
          </a>
          <a href="https://www.apollographql.com" target="_blank" rel="noopener noreferrer">
            <ApolloLogo />
          </a>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
