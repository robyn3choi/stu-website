import React from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className='nav'>
      <div className='nav__links'>
        <div className='nav__link-container nav__link-container_left'>
          <Link to={`/${props.leftLink}`} className='nav__link'>{props.leftLink}</Link>
        </div>
        <div className='nav__link-container'>
          <Link to='/' className='nav__link'>
            <img className='nav__face' alt='home' src={require('./stu-face-nav.png')} />
            <img className='nav__face nav__face_highlighted' alt='home_highlighted' src={require('./stu-face-nav-red.png')} />
          </Link>
        </div>
        <div className='nav__link-container nav__link-container_right'>
          <Link to={`/${props.rightLink}`} className='nav__link'>{props.rightLink}</Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
