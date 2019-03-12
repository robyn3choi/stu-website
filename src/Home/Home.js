import React, { Component } from 'react';
import './Home.scss';
import HomeNavLink from './HomeNavLink/HomeNavLink';
import { CSSTransition } from 'react-transition-group';

class Home extends Component {
  state = {isMounted: false};

  componentDidMount() {
    this.setState({isMounted: true});
    this.props.visitHome();
  }

  setHoveredElementPos(hoveredElementPos) {
    this.props.setHoveredElementPos(hoveredElementPos);
  }

  render() {
    return (
      <CSSTransition in={this.state.isMounted && !this.props.hasVisitedHome} classNames="home" timeout={2000}>
      <div className='home'>
        <div className='home-nav'>
          <HomeNavLink text='about' path='/about' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
          <HomeNavLink text='music' path='/music' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
          <HomeNavLink text='contact' path='/contact' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
        </div>
        <img className='home__title' alt='home-title' src={require('./stu-title.png')} />
        <img className='home__face' alt='home-face' src={require('./stu-face.png')} />

      </div>
      </CSSTransition>
    );
  }
}


export default Home;
