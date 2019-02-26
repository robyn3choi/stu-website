import React from 'react';
import './Home.scss';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import About from './About/About';
import Contact from './Contact/Contact';

const Nav = (props) => {
  return (
    <Router>
      <div className='nav'>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><HashLink smooth to="/#music">Music</HashLink></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <TransitionGroup component={null}>
        <Route render={location => {
          return (
            <Switch>
              <Route path='/about' render={props => <About {...props} paragraphs={aboutParagraphs} />} />
              <Route path='/contact' render={props => <Contact {...props} email={contactEmail} />} />
            </Switch>
          )
        }}
        />
      </TransitionGroup>
    </Router>
  );
}

export default Nav;
