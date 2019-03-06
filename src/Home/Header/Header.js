import React, { Component } from 'react';
import './Header.scss';
import HeaderCanvas from './HeaderCanvas/HeaderCanvas';
import HomeNavLink from './HomeNavLink/HomeNavLink';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hoveredElementPos: null
    }
  }

  setHoveredElementPos(hoveredElementPos) {
    this.setState({ hoveredElementPos: hoveredElementPos });
  }

  render() {
    return (
      <div className='header'>
        <div className='home-nav'>
          <HomeNavLink name='about' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
          <HomeNavLink name='music' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
          <HomeNavLink name='contact' setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />
        </div>

        <HeaderCanvas position='back' hoveredElementPos={this.state.hoveredElementPos} />
        <HeaderCanvas position='front' hoveredElementPos={this.state.hoveredElementPos} />
        <img className='header__title' alt='header-title' src={require('./stu-title.png')} />
        <img className='header__face' alt='header' src={require('./stu-face.png')} />

      </div>
    );
  }
}


export default Header;
