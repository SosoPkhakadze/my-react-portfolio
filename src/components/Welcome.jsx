import React, { useRef } from 'react';
import { ReactTyped } from 'react-typed'; // Import ReactTyped correctly
import './Welcome.css';

const Welcome = () => {
  const typedRef = useRef(null); 

  return (
    <section id="welcome">
      <div className="text-container">
        <h1>Hi, I'm Soso Pkhakadze</h1>
        <span ref={typedRef} style={{ display: 'inline-block' }}></span>
        <ReactTyped
          strings={[
            'A passionate Full-Stack Developer',
            'Experienced Data Engineer',
          ]}
          typeSpeed={40}
          backSpeed={50}
          loop
          el={typedRef.current}
        />
      </div>
    </section>
  );
};

export default Welcome;