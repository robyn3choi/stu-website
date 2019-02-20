import React from 'react';
import Particles from 'react-particles-js';

const particleParams = {
  particles: {
    number: {
      value: 100
    },
    shape: {
      type: 'triangle',
    }
  }
}

const Home = (props) => {
  console.log(particleParams);
  return (
    <div>
      <Particles params={particleParams} />
    </div>
  );
}

export default Home;
