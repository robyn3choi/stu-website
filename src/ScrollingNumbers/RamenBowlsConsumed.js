import React from 'react';
import ScrollingNumber from './ScrollingNumber';

const RamenBowlsConsumed = () => {
  return (
    <ScrollingNumber targetNumber={Number.MAX_SAFE_INTEGER} infinite={true}/>
  );
}

export default RamenBowlsConsumed;
