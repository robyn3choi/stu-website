import React, { Component } from 'react';
import MusicItem from './MusicItem/MusicItem';
import AliasFilterList from './AliasFilter/AliasFilterList';
import MusicGrid from './MusicGrid/MusicGrid';
import SectionHeading from '../common/SectionHeading';
import './Music.scss';

class Music extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedAlias: null
    };
    this.musicGrid = React.createRef();
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
    this.musicGrid.current.filterByAlias(alias);
  }

  render() {
    if (this.props.allMusicItems.length > 0) {
      const musicItemComponents = this.createMusicList(this.props.allMusicItems);
      return(
        <section id='music' ref={this.props.scrollRef}>
          <SectionHeading text='Music' />
          <AliasFilterList 
            musicItems={this.props.allMusicItems} 
            filterByAlias={this.filterByAlias}
            selectedAlias={this.state.selectedAlias}
          />
          <MusicGrid musicItemComponents={musicItemComponents} ref={this.musicGrid}/>
        </section>
      );
    }
    
    return <h1>Loading...</h1>;
  }
}

export default Music;
