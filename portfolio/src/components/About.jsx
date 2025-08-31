import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Me</h1>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Evan Patrick</h2>
            <h3>Software Engineer & Web Developer</h3>
            
            <p>
              I'm a passionate software engineer and web developer with a strong foundation in modern web technologies. 
              I specialize in creating responsive, user-friendly applications that solve real-world problems.
            </p>
            
            <p>
              My journey in software development began with a curiosity for how things work on the web, 
              and has evolved into a deep passion for building applications that make a difference. 
              I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
            </p>
            
            <div className="skills-section">
              <h3>Technical Skills</h3>
              <div className="skills-grid">
                <div className="skill-category">
                  <h4>Frontend</h4>
                  <ul>
                    <li>React.js</li>
                    <li>JavaScript (ES6+)</li>
                    <li>HTML5 & CSS3</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h4>Backend</h4>
                  <ul>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>GraphQL</li>
                    <li>REST APIs</li>
                    <li>Database Design</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h4>Tools & Technologies</h4>
                  <ul>
                    <li>Git & GitHub</li>
                    <li>VS Code</li>
                    <li>Vite</li>
                    <li>Webpack</li>
                    <li>Docker</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="experience-section">
              <h3>Experience</h3>
              <p>
                I've worked on various projects ranging from personal portfolio websites to full-stack applications. 
                Each project has taught me valuable lessons about user experience, performance optimization, 
                and the importance of writing scalable code.
              </p>
            </div>
            
            <div className="contact-section">
              <h3>Let's Connect</h3>
              <p>
                I'm always interested in new opportunities and collaborations. 
                Feel free to reach out if you'd like to discuss potential projects or just want to connect!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 