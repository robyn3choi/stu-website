import React, { Component } from 'react';
import Prismic from 'prismic-javascript';	
import MusicItem from './MusicItem/MusicItem';
import AliasFilterButtonList from './AliasFilterButtonList';
import styles from './MusicList.module.css';

class MusicList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allMusicItems: [],
      displayedMusicItems: [],
      selectedAlias: 'All'
    }
  }
  
  componentDidMount() {
    // TODO: hide link and change to stu's actual prismic
    const apiEndpoint = 'https://stu-website.prismic.io/api/v2';
    Prismic.api(apiEndpoint)
    .then(api => {
      api.query(Prismic.Predicates.at('document.type', 'music_item'),
        {orderings : '[my.music_item.release_date desc]'})
      .then(response => {
        if (response) {
          this.setState({allMusicItems: response.results, displayedMusicItems: response.results});
        }
      });
    });
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
      this.setState({displayedMusicItems: this.state.allMusicItems});
    }
    else {
      const displayedMusicItems = this.state.allMusicItems.filter(musicItem => musicItem.data.alias === alias);
      this.setState({displayedMusicItems: displayedMusicItems});
    }
  }

  render() {
    const displayedMusicItems = this.state.displayedMusicItems;

    if (displayedMusicItems.length > 0) {
      const musicItemArray = this.createMusicList(displayedMusicItems);
      return(
        <div>
          <AliasFilterButtonList 
            musicItems={this.state.allMusicItems} 
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
