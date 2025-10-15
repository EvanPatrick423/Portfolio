'use client';

import { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Homepage from '../components/Home/Home';
import About from '../components/About/About';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="main-container">
      <NavBar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </div>
  );
}

