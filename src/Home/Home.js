import React, { Component } from 'react';
import './Home.scss';
import HomeNavLink from './HomeNavLink/HomeNavLink';
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
    setTimeout(() => this.setState({hasDelayed: true}), 200);
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

    const shouldFadeIn = this.state.isMounted && !this.props.hasFirstPageLoaded;

    return (
      <CSSTransition in={shouldFadeIn} classNames="home" timeout={4500}>
        <div className='home'>
          <CSSTransition in={shouldFadeIn} classNames="home-nav" timeout={5800}>
            <div className='home-nav'>
              <HomeNavLink text='about' path='/about' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
              <HomeNavLink text='music' path='/music' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
              <HomeNavLink text='contact' path='/contact' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
            </div>
          </CSSTransition>
          {/* <img className='home__title' alt='home-title' src={require('./stu-title.png')} /> */}
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
