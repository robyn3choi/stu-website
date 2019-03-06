import React from 'react';
import SectionHeading from '../common/SectionHeading/SectionHeading';
import Nav from '../common/Nav/Nav';
import './Contact.scss';

const Contact = (props) => {
  return (
    <div className='contact'>
      <Nav leftLink='About' rightLink='Music'/>
      <SectionHeading text='Contact' />
      {props.email}
  </div>
  );
}

export default Contact;
