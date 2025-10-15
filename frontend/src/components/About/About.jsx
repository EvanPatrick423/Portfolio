'use client';

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
              I&apos;m a passionate software engineer and web developer with a strong foundation in modern web technologies. 
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
                    <li>Next.js</li>
                    <li>JavaScript (ES6+)</li>
                    <li>HTML5 & CSS3</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h4>Backend</h4>
                  <ul>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>GraphQL</li>
                    <li>REST APIs</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h4>Tools & Technologies</h4>
                  <ul>
                    <li>Git & GitHub</li>
                    <li>VS Code</li>
                    <li>Next.js</li>
                    <li>Docker</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="experience-section">
              <h3>Experience</h3>
              <p>
                A software developer with over 4 years of experience in profesional development enviornments. I&apos;ve worked on various projects ranging from personal portfolio websites to full-stack applications. 
                Each project has taught me valuable lessons about user experience, performance optimization, 
                and the importance of writing scalable code.
              </p>
              <div className="experience-grid">
                <div className="experience-item">
                  <h4>Drivetime</h4>
                  <ul>
                    <li>Software Engineer</li>
                    <li>Aug 2023 - Present</li>
                  </ul>

                  <ul className="experience-description">
                    <li>
                        Designed and implemented UI overhaul for internal loan processing application. 
                        Merging the UI into one clean interface that allowed users to see progress of different 
                        applications and have access to vital data needed to make decisions on loan applications. 
                        Reducing time to fund for our business from 7-8 to 3-4 days.
                    </li>
                    <li>
                      Created a testing application to send in mock applications to our testing
                       environment using mock Experian data with a few clicks drastically 
                       reducing testing time for new features and speeding up the development 
                       cycle for our entire team. One test application went from 5 min of work, 
                       to a 10 second process.
                    </li>
                    <li>
                      Designed and implemented an automatic testing architecture to our Mendix 
                      app. Tests ran after every deployment in all environments and 
                      would send Slack messages to pertinent channels upon failing tests. 
                    </li>
                  </ul>
                </div>
                <div className="experience-item">
                  <h4>EPI-USE</h4>
                  <ul>
                    <li>Software Engineer</li>
                    <li>Oct 2021 - Aug 2023</li>
                  </ul>
                  <ul className="experience-description">
                    <li>
                      Designed and developed enterprise-level applications for clients at
                      EPI-USE America Inc.
                    </li>
                    <li>
                      Designed and implemented a parts inventory and ordering system for 
                      a defense manufacturer. Allowing engineering teams to be able to 
                      easily look up inventory of parts, possible replacement parts in 
                      inventory, and order parts directly from the system.
                    </li>
                    <li>
                      Created a sales approval and tracking system for a defense manufacturer.
                      Allowing sales teams to easily track the status of sales orders and 
                      get approval from engineering teams to ensure they are will be able to 
                      meet quality standards and timelines of sales orders.
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            
            <div className="contact-section">
              <h3>Let&apos;s Connect</h3>
              <p>
                I&apos;m always interested in new opportunities and collaborations. 
                Feel free to reach out if you&apos;d like to discuss potential projects or just want to connect!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
