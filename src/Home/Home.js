import React from 'react';
import Header from './Header/Header'
import './Home.scss';

const Home = (props) => {
  return (
    <div className='home'>
      <Header setRoute={props.setRoute}/>
    </div>
  );
}

export default Home;
