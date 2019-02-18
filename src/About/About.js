import React from 'react';

const About = (props) => {
  const pElements = props.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);
  return (
    <div>{pElements}</div>
  );
}

export default About;
