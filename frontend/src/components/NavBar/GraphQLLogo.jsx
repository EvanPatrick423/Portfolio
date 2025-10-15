'use client';

import React from 'react';

const GraphQLLogo = () => {
  return (
      <svg 
        className="logo graphql" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ fill: 'color(display-p3 .8824 0 .5961)' }}
        viewBox="0 0 100 100"
        alt="GraphQL logo"
      >
        <path 
          fillRule="evenodd" 
          d="m50 6.468 37.7 21.766v43.532L50 93.532 12.3 71.766V28.234zM16.53 30.676v31.976l27.692-47.964zM50 13.14 18.078 68.43h63.844zm27.692 59.52H22.308L50 88.648zm5.778-10.008L55.778 14.688 83.47 30.676z" 
          clipRule="evenodd"
        />
        <circle cx="50" cy="9.321" r="8.82" />
        <circle cx="85.229" cy="29.66" r="8.82" />
        <circle cx="85.229" cy="70.34" r="8.82" />
        <circle cx="50" cy="90.679" r="8.82" />
        <circle cx="14.766" cy="70.34" r="8.82" />
        <circle cx="14.766" cy="29.66" r="8.82" />
      </svg>
  );
};

export default GraphQLLogo;
