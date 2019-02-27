import React, { Component } from 'react';
import './Header.scss';
import HeaderCanvas from './HeaderCanvas/HeaderCanvas';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import About from './../../About/About';
import Contact from './../../Contact/Contact';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hoveredElementPos: null
    }
    this.aboutRef = React.createRef();
    this.musicRef = React.createRef();
    this.contactRef = React.createRef();
  }

  onNavMouseEnter(link) {
    if (link === 'about') {
      const rect = this.aboutRef.current.getBoundingClientRect();
      this.setState({hoveredElementPos: {x: rect.x, y: rect.y}});
    }
  }

  onNavMouseLeave(link) {
    console.log("leave");
    this.setState({hoveredElementPos: null});
  }

  render() {
    return (
      <div className='header'>
        <Router>

          <div className='nav'>
            <div className='nav__link-container nav__link-container_about' ref={this.aboutRef} 
              onMouseEnter={() => this.onNavMouseEnter('about')} onMouseLeave={() => this.onNavMouseLeave('about')}>
              <Link className='nav__link' to="/about">About</Link>
            </div>
            <div className='nav__link-container nav__link-container_music' ref={this.musicRef} 
              onMouseEnter={() => this.onNavMouseEnter('music')} onMouseLeave={() => this.onNavMouseLeave('music')}>
              <HashLink smooth to="/#music" className='nav__link'>Music</HashLink>
            </div>
            <div className='nav__link-container nav__link-container_contact' ref={this.contactRef} 
              onMouseEnter={() => this.onNavMouseEnter('contact')} onMouseLeave={() => this.onNavMouseLeave('contact')}>
              <Link to="/contact" className='nav__link'>Contact</Link>
            </div>

            <TransitionGroup component={null}>
              <Route render={location => {
                return (
                  <Switch>
                    <Route path='/about' render={props => <About {...props} paragraphs={props.aboutParagraphs} />} />
                    <Route path='/contact' render={props => <Contact {...props} email={props.contactEmail} />} />
                  </Switch>
                )
              }}
              />
            </TransitionGroup>
          </div>
        </Router>
        <HeaderCanvas position='back' hoveredElementPos={this.state.hoveredElementPos} />
        <HeaderCanvas position='front' hoveredElementPos={this.state.hoveredElementPos} />
        <img className='header__title' alt='header-title' src={require('./stu-title.png')} />
        <img className='header__face' alt='header' src={require('./stu-face.png')} />
      </div>
    );
  }
}


export default Header;
