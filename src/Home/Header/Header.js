import React from 'react';
import './Header.scss';
import HeaderCanvas from './HeaderCanvas/HeaderCanvas';

const Header = (props) => {
  return (
    <div className='header'>
      <HeaderCanvas position='back'/>
      <HeaderCanvas position='front'/>
      <img className='header__title' alt='header-title' src={require('./stu-title.png')} />
      <img className='header__face' alt='header' src={require('./stu-face.png')} />
    </div>
  );
}


export default Header;
