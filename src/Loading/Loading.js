import React from 'react';
import './Loading.scss';
import Lottie from 'react-lottie';
import * as animData from './data.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='loading-anim'>
      <Lottie options={defaultOptions} />
    </div>
  )
}

export default Loading;
