'use client';

import React from 'react';
import Image from 'next/image';

const NextJsLogo = () => {
  return (
    <Image 
      src="/nextjs.png" 
      className="logo nextjs" 
      alt="Next.js logo" 
      width={48} 
      height={48} 
    />
  );
};

export default NextJsLogo;

