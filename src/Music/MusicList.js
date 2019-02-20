import React, { Component } from 'react';
import MusicItem from './MusicItem/MusicItem';
import AliasFilterButtonList from './AliasFilterButtonList';
import styles from './MusicList.module.css';

class MusicList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      displayedMusicItems: this.props.allMusicItems,
      selectedAlias: 'All'
    }
  }

  createMusicList = (musicItems) => {
    const musicItemArray = musicItems.map((musicItem, i) => {
      const item = musicItem.data;
      return <MusicItem 
        key = {i}
        title={item.title}
        alias={item.alias}
        coverArt={item.cover_art.url}
        spotify={item.spotify_link ? item.spotify_link.url : undefined}
        youtube={item.youtube_link ? item.youtube_link.url : undefined}
        soundcloud={item.soundcloud_link ? item.soundcloud_link.url : undefined}
      />
    });
    return musicItemArray;
  }

  filterByAlias = (alias) => {
    this.setState({selectedAlias: alias});
    
    if (alias === 'All') {
      this.setState({displayedMusicItems: this.props.allMusicItems});
    }
    else {
      const displayedMusicItems = this.props.allMusicItems.filter(musicItem => musicItem.data.alias === alias);
      this.setState({displayedMusicItems: displayedMusicItems});
    }
  }

  render() {
    const displayedMusicItems = this.state.displayedMusicItems;

    if (displayedMusicItems && displayedMusicItems.length > 0) {
      const musicItemArray = this.createMusicList(displayedMusicItems);
      return(
        <div>
          <AliasFilterButtonList 
            musicItems={this.props.allMusicItems} 
            filterByAlias={this.filterByAlias}
            selectedAlias={this.state.selectedAlias}
          />
          <div id={styles.music_list}>{musicItemArray}</div>
        </div>
      );
    }
    
    return <h1>Loading...</h1>;
  }
}

export default MusicList;
