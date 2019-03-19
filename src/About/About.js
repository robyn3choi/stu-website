import React, { Component } from 'react';
import './About.scss';
import { CSSTransition } from 'react-transition-group';
import Lottie from 'react-lottie';
import * as animData from './data.json';

class About extends Component {
  state = { 
    isMounted: false,
    isTransitionDone: false
   };

  componentDidMount() {
    this.setState({ isMounted: true });
    this.timeout = setTimeout(() => this.setState({isTransitionDone: true}), 1000);
  }
  
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: animData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const pElements = this.props.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);
    
    return (
      <div className='about non-home-section'>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={500}>
          <div className='page-heading'>
            <Lottie options={defaultOptions} isStopped={!this.state.isTransitionDone} />
          </div>
        </CSSTransition>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={580}>
          <div className='about-text'>{pElements}</div>
        </CSSTransition>
      </div>
    );
  }
}

export default About;
