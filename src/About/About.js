import React, { Component } from 'react';
import SectionHeading from '../common/SectionHeading/SectionHeading';
import Nav from '../common/Nav/Nav';
import './About.scss';
import { CSSTransition } from 'react-transition-group';

class About extends Component {
  state = {isMounted: false};

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render() {
    const pElements = this.props.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);
    return (
      <div className='about non-home-section'>
        <CSSTransition in={this.state.isMounted} classNames="section-heading" timeout={500}>
          <SectionHeading text='About' />
        </CSSTransition>
        <CSSTransition in={this.state.isMounted} classNames="about-text" timeout={550}>
          <div className='about-text'>{pElements}</div>
        </CSSTransition>
      </div>
    );
  }
}

// const About = (props) => {
//   const pElements = props.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);
//   return (
//     <div className='about non-home-section'>
//     <TransitionGroup>
//       <CSSTransition key="about-heading" classNames="about-heading" timeout={1000}>
//         <SectionHeading text='About' />
//       </CSSTransition>
//     </TransitionGroup>
//     <TransitionGroup>
//       <CSSTransition key="about-text" classNames="about-text" timeout={1000}>
//         <div className='about-text'>{pElements}</div>
//       </CSSTransition>
//     </TransitionGroup>
//     </div>
//   );
// }

export default About;
