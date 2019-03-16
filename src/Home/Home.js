import React, { Component } from 'react';
import './Home.scss';
import TriangleLink from './../common/TriangleLink/TriangleLink';
import { CSSTransition } from 'react-transition-group';
import Lottie from 'react-lottie';
import * as animData from './data.json';

class Home extends Component {
  state = {
    isMounted: false,
    hasDelayed: false
  };

  componentDidMount() {
    this.setState({ isMounted: true });
    setTimeout(() => this.setState({hasDelayed: true}), 600);
  }

  setHoveredElementPos(hoveredElementPos) {
    this.props.setHoveredElementPos(hoveredElementPos);
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

    const isBrokenBrowser = this.props.browser === 'edge' || this.props.browser === 'ie';
    const shouldFadeIn = this.state.isMounted && !this.props.hasFirstPageLoaded && !isBrokenBrowser;

    return (
      <CSSTransition in={shouldFadeIn} classNames="home" timeout={4500}>
        <div className='home'>
          <CSSTransition in={shouldFadeIn} classNames="home-nav" timeout={5800}>
            <div className='home-nav'>
              <TriangleLink text='about' path='/about' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
              <TriangleLink text='music' path='/music' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
              <TriangleLink text='contact' path='/contact' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
            </div>
          </CSSTransition>
          <div className='home__title'>
            {shouldFadeIn ? <Lottie options={defaultOptions} isStopped={!this.state.hasDelayed} />
              : <img className='home__title' alt='home-title' src={require('./stu-title.png')} />}
          </div>
          <img className='home__face' alt='home-face' src={require('./stu-face.png')} />
        </div>
      </CSSTransition>
    );
  }
}


export default Home;
