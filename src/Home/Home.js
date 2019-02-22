import React from 'react';
import Header from './Header/Header'
import Music from '../Music/Music'
import './Home.scss';

const Home = (props) => {
  return (
    <div className='home'>
      <Header />
      <Music allMusicItems={props.allMusicItems} scrollRef={props.scrollRef}/>
    </div>
  );
}

export default Home;
