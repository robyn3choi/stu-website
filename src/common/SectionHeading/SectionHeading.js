import React from 'react';
import './SectionHeading.scss';

const SectionHeading = (props) => {
  return (
    <h1 className='section-heading'>{props.text}</h1>
  );
}

export default SectionHeading;
