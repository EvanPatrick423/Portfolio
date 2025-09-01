import React, { useState } from 'react';

const ApolloLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg 
      className="logo apollo animated-logo_logo__noLic animated-logo_theme-reGrowth__TZQ7w" 
      viewBox="0 0 78 78" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apollo GraphQL"
    >
      <defs>
        <style>
          {`
            @keyframes orbit {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes dashOffset {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -100; }
            }
            .animated-logo_orbit { 
              animation: orbit 39s linear infinite;
              transform-origin: 39px 39px; 
            }
            .animated-logo_orbit.hovered { 
              animation: orbit 5s linear infinite;
              transform-origin: 39px 39px; 
            }
            .animated-dash {
              stroke-dasharray: 5 5;
              animation: dashOffset 2s linear infinite;
            }
            .apollo-logo {
              --color: #3f20ba;
              --background-color: #fff;
            }
          `}
        </style>
      </defs>
      
      {/* Outer orbital ring */}
      <path 
        d="M39 77.5C60.263 77.5 77.5 60.263 77.5 39C77.5 17.737 60.263 0.5 39 0.5C17.737 0.5 0.5 17.737 0.5 39C0.5 60.263 17.737 77.5 39 77.5Z" 
        stroke="#3f20ba" 
        strokeWidth="0.5"
        fill="#FFEADB"
        onMouseOver={() => setIsHovered(true)} 
        onMouseOut={() => setIsHovered(false)}
      />
      
      {/* Main Apollo triangular symbol */}
      <path 
        d="M50.6771 46.4275L49.4452 42.9266L47.8229 38.3168L46.6494 34.9807L45.113 30.6146L43.3283 25.5435H34.6718L33.2901 29.4703L32.0582 32.9712L25.9397 50.3582H31.6489L33.4399 45.2831H42.098L40.5616 40.917H34.9699L36.1435 37.5809L38.5949 30.6146L39.0001 29.4616L39.4053 30.6146L46.3496 50.3543L46.3512 50.3582H52.0604L50.6771 46.4275Z" 
        fill="#3f20ba"
        onMouseOver={() => setIsHovered(true)} 
        onMouseOut={() => setIsHovered(false)}
      />
      
      <path 
        d="M61.5744 26.2968C63.7606 30.1732 64.906 34.5496 64.899 39C64.899 53.3034 53.3036 64.8989 39.0002 64.8989C24.6968 64.8989 13.1013 53.3034 13.1013 39C13.1013 24.6966 24.6968 13.1012 39.0002 13.1012C43.6465 13.0938 48.2085 14.3425 52.2034 16.7151.5744 26.2968C63.7606 30.1732 64.906 34.5496 64.899 39C64.899 53.3034 53.3036 64.8989 39.0002 64.8989C24.6968 64.8989 13.1013 53.3034 13.1013 39C13.1013 24.6966 24.6968 13.1012 39.0002 13.1012C43.6465 13.0938 48.2085 14.3425 52.2034 16.7151" 
        stroke="#3f20ba" 
        strokeWidth="2.20238" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeDashoffset="0px"
        strokeDasharray="none"
        className={`animated-logo_orbit ${isHovered ? 'hovered' : ''}`}
        fill="none"
        onMouseOver={() => setIsHovered(true)} 
        onMouseOut={() => setIsHovered(false)}
      />
      
             {/* Animated orbiting element */}
       <g 
         className={`animated-logo_orbit ${isHovered ? 'hovered' : ''}`} 
         style={{ transformOrigin: '39px 39px' }} 
         
       >
        <path 
          d="M53.7499 21.1C55.6001 21.1 57.0999 19.6002 57.0999 17.75C57.0999 15.8999 55.6001 14.4 53.7499 14.4C51.8997 14.4 50.3999 15.8999 50.3999 17.75C50.3999 19.6002 51.8997 21.1 53.7499 21.1Z" 
          fill="#3f20ba" 
          style={{ opacity: '1', visibility: 'inherit' }}
          onMouseOver={() => setIsHovered(true)} 
          onMouseOut={() => setIsHovered(false)}
        />
      </g>
    </svg>
  );
};

            export default ApolloLogo;
