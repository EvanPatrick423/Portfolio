'use client';

import Image from 'next/image';
import reactLogo from '../../assets/react.svg';
import viteLogo from '../../../public/vite.svg';
import './NavBar.css';
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
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <Image src={viteLogo} className="logo" alt="Vite logo" width={48} height={48} />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <Image src={reactLogo} className="logo react" alt="React logo" width={48} height={48} />
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
