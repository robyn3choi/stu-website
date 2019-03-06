import React from 'react';
import './Nav.scss';
import {Link} from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className='nav'>
      <div className='nav__link-container'>
      <Link to={`/${props.leftLink}`} className='nav__link'>{props.leftLink}</Link>
        <Link to='/' className='nav__link'>
          <img alt='home' src={require('./stu-face-nav.png')} />
        </Link>
        <Link to={`/${props.rightLink}`} className='nav__link'>{props.rightLink}</Link>
      </div>
    </div>
  );
}

export default Nav;
