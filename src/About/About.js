import React from 'react';
import SectionHeading from '../common/SectionHeading/SectionHeading';
import Nav from '../common/Nav/Nav';
import './About.scss';

const About = (props) => {
  const pElements = props.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);
  return (
    <div className='about'>
      <Nav leftLink='Music' rightLink='Contact'/>
      <SectionHeading text='About' />
      <div className='about-text'>{pElements}</div>
    </div>
  );
}

export default About;
