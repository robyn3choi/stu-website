import React, { Component } from 'react';
import './Home.scss';
import HomeNavLink from './HomeNavLink/HomeNavLink';
import { CSSTransition } from 'react-transition-group';

class Home extends Component {
  state = {isMounted: false};

  componentDidMount() {
    this.setState({isMounted: true});
  }

  setHoveredElementPos(hoveredElementPos) {
    this.props.setHoveredElementPos(hoveredElementPos);
  }

  render() {
    return (
      <CSSTransition in={this.state.isMounted} classNames="home" timeout={1000}>
      <div className='home'>
        <div className='home-nav'>
          <HomeNavLink name='about' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
          <HomeNavLink name='music' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
          <HomeNavLink name='contact' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
        </div>
        <img className='home__title' alt='home-title' src={require('./stu-title.png')} />
        <img className='home__face' alt='home-face' src={require('./stu-face.png')} />

      </div>
      </CSSTransition>
    );
  }
}


export default Home;
