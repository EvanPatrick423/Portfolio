import React, { useState } from 'react';
import './Projects.css';
import EtchASketchWidget from './PixelSketch/EtchASketchWidget';
import CalculatorWidget from './Calculator/CalculatorWidget';
import RockPaperScissorsWidget from './RockPaperScissors/RockPaperScissorsWidget';
import TicTacToeWidget from './TicTacToe/TicTacToeWidget';
import LibraryWidget from './Library/LibraryWidget';
import ToDoWidget from './ToDo/ToDoWidget';

const Projects = () => {
  const [odinProjectPage, setOdinProjectPage] = useState('pixelSketch');

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React and CSS. Features dark theme, smooth navigation, and professional design.",
      technologies: ["React", "CSS3", "JavaScript", "Vite"],
      image: "/src/assets/portfolio-preview.jpg",
      githubLink: "https://github.com/EvanPatrick423/portfolio",
      liveLink: "#"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, product management, and payment processing.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      image: "/src/assets/ecommerce-preview.jpg",
      githubLink: "https://github.com/EvanPatrick423/ecommerce",
      liveLink: "#"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team features.",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      image: "/src/assets/task-app-preview.jpg",
      githubLink: "https://github.com/EvanPatrick423/task-manager",
      liveLink: "#"
    }
  ];

  const odinProjects = {
    pixelSketch: {
      title: "Pixel Pad",
      description: "An interactive drawing application inspired by the classic Etch A Sketch toy.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Drawing functionality", "Color picker", "Grid size adjustment", "Clear canvas option"]
    },
    rockPaperScissors: {
      title: "Rock Paper Scissors",
      description: "A classic game with computer opponent and score tracking.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Computer opponent", "Score tracking", "Game history", "Best of 5 mode"]
    },
    calculator: {
      title: "Calculator",
      description: "A fully functional calculator with basic arithmetic operations and a clean interface.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Basic arithmetic operations", "Clear and delete functions", "Responsive design", "Keyboard support"]
    },
    ticTacToe: {
      title: "Tic Tac Toe",
      description: "A two-player Tic Tac Toe game with win detection and game reset.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Two-player mode", "Win detection", "Game reset", "Score tracking"]
    },
    library: {
      title: "Library",
      description: "A book management system for tracking personal reading collection.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Add/remove books", "Read status tracking", "Local storage", "Search functionality"]
    },
    todo: {
      title: "Todo List",
      description: "A task management application for organizing daily activities.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Add/delete tasks", "Priority levels", "Due dates", "Task categories"]
    }
  };

  const renderOdinProjectContent = () => {
    const project = odinProjects[odinProjectPage];
    
    // Render the Calculator widget if that project is selected
    if (odinProjectPage === 'calculator') {
      return <CalculatorWidget />;
    }
    
    // Render the Etch A Sketch widget if that project is selected
    if (odinProjectPage === 'pixelSketch') {
      return <EtchASketchWidget />;
    }
    
    // Render the Rock Paper Scissors widget if that project is selected
    if (odinProjectPage === 'rockPaperScissors') {
      return <RockPaperScissorsWidget />;
    }
    
    // Render the Tic Tac Toe widget if that project is selected
    if (odinProjectPage === 'ticTacToe') {
      return <TicTacToeWidget />;
    }
    
    // Render the Library widget if that project is selected
    if (odinProjectPage === 'library') {
      return <LibraryWidget />;
    }
    
    // Render the ToDo widget if that project is selected
    if (odinProjectPage === 'todo') {
      return <ToDoWidget />;
    }
    
    return (
      <div className="odin-project-content">
        <h3 className="odin-project-title">{project.title}</h3>
        <p className="odin-project-description">{project.description}</p>
        
        
      </div>
    );
  };

  return (
    <div className="projects-page">
      <div className="projects-container">
        {/*}
        <h1 className="projects-title">My Projects</h1>
        
        <div className="projects-intro">
          <p>
            Here are some of the projects I've worked on. Each project demonstrates different skills and technologies 
            I've learned throughout my development journey.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <span>{project.title}</span>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link github-link"
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link live-link"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        */}

        {/* Odin Project Section */}
        <div className="odin-project-section">
          <h2 className="odin-project-section-title">The Odin Project</h2>
          <p className="section-description">
            A collection of foundational projects completed during my web development learning journey.
          </p>
          <p className="section-description-2">
            Each project was originally written in HTML, CSS, and JavaScript. I have converted them to React components for this implementation.
          </p>
          
          <div className="odin-project-container">
            <div className="odin-nav">
              <h3>Projects</h3>
              <ul className="odin-nav-list">
                {Object.keys(odinProjects).map((projectKey) => (
                  <li key={projectKey}>
                    <button
                      className={`odin-nav-button ${odinProjectPage === projectKey ? 'active' : ''}`}
                      onClick={() => setOdinProjectPage(projectKey)}
                    >
                      {odinProjects[projectKey].title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="odin-content">
              {renderOdinProjectContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 