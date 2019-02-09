import React, { Component } from 'react';
import './App.css';
import TotalYoutubeViews from './ScrollingNumbers/TotalYoutubeViews';
import TotalSpotifyFollowers from './ScrollingNumbers/TotalSpotifyFollowers';
import RamenBowlsConsumed from './ScrollingNumbers/RamenBowlsConsumed';
import MusicList from './Music/MusicList';

class App extends Component {

  render() {
    return (
      <div>
        <TotalYoutubeViews />
        <TotalSpotifyFollowers />
        <RamenBowlsConsumed />
        <MusicList />
      </div>
    );
  }
}

export default App;
