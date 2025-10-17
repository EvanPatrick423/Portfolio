'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar/NavBar';

// Dynamically import components with no SSR to prevent hydration issues
const Homepage = dynamic(() => import('../components/Home/Home'), { ssr: false });
const About = dynamic(() => import('../components/About/About'), { ssr: false });
const Projects = dynamic(() => import('../components/Projects/Projects'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact/Contact'), { ssr: false });

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

