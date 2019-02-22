import React from 'react';
import './About.scss';

const About = (props) => {
  const pElements = props.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);
  return (
    <div className='about'>
      {pElements}
    </div>
  );
}

export default About;
