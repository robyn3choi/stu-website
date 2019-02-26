import React from 'react';
import SectionHeading from '../common/SectionHeading';
import './About.scss';

const About = (props) => {
  const pElements = props.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);
  return (
    <div className='about'>
      <SectionHeading text='About' />
      <div className='about-text'>{pElements}</div>
    </div>
  );
}

export default About;
