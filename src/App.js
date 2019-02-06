import React, { Component } from 'react';
import './App.css';
import TotalYoutubeViews from './ScrollingNumbers/TotalYoutubeViews';
import TotalSpotifyFollowers from './ScrollingNumbers/TotalSpotifyFollowers';
import RamenBowlsConsumed from './ScrollingNumbers/RamenBowlsConsumed';
import SongList from './Songs/SongList';

class App extends Component {

  render() {
    return (
      <div>
        <TotalYoutubeViews />
        <TotalSpotifyFollowers />
        <RamenBowlsConsumed />
        <SongList />
      </div>
    );
  }
}

export default App;
